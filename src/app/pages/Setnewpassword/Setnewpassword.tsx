import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Button, Footer, Header, Input, Label } from "../../../components/index";
import { useNavigate, useSearchParams } from "react-router";
import { useSetnewpassword } from "../../../hooks/useSetnewpassword";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import { SET_NEW_PASSWORD_ROUTE } from "../../../helper/routes";

export function SetNewPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { mutate } = useSetnewpassword();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        token: token
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            setError("Invalid or expired reset link");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        mutate(
            {
                newPassword: formData.password,
                confirmPassword: formData.confirmPassword,
                token,
            },
            {
                onSuccess: (data) => {
                    setIsLoading(false);
                    if (data?.success) {
                        setIsSuccess(true);
                        toast.success(data.message);
                    } else {
                        toast.error(data.message);
                    }
                },
                onError: (error: any) => {
                    setIsLoading(false);
                    setError(
                        error?.response?.data?.message ||
                        "An error occurred. Please try again."
                    );
                },
            }
        );
    };

    return (
        <>
            <Seo url={SET_NEW_PASSWORD_ROUTE} />
            <Header />
            <div className="min-h-screen bg-white flex items-center justify-center px-4 my-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 form-shadow"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-soft rounded-full flex items-center justify-center mx-auto mb-4">
                            {isSuccess ? (
                                <CheckCircle className="w-8 h-8 check-color" />
                            ) : (
                                <Lock className="w-8 h-8 text-primary" />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-2">
                            {isSuccess ? "Password Reset!" : "Set New Password"}
                        </h2>
                        <p className="text-primary2">
                            {isSuccess
                                ? "Your password has been successfully updated."
                                : "Your new password must be different from previously used passwords."}
                        </p>
                    </div>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-black">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        className={`pl-10 pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-[var(--primary-color)]"}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        className={`pl-10 pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-[var(--primary-color)]"}`}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full "
                                disabled={isLoading}
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    ) : (
                        <Button
                            onClick={() => navigate('/login')}
                            size="lg"
                            className="w-full gradient-primary shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                        >
                            Back to Login
                        </Button>
                    )}

                    {!isSuccess && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center text-sm text-primary2 hover:text-primary transition-colors font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Log In
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
            <Footer />
        </>
    );
}