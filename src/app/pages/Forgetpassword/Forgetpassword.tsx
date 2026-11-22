import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowLeft, KeyRound, CheckCircle } from "lucide-react";
import { Button, Footer, Header, Input, Label } from "../../../components/index";
import { useNavigate } from "react-router";
import { useForgetpassword } from "../../../hooks/useForgetpassword";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import { FORGOT_PASSWORD_ROUTE } from "../../../helper/routes";

export function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = useForgetpassword();

    const validateEmail = (email:string) => {
        return String(email)
            .toLowerCase()
            .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Email address is required");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        const payload = {
            email: email
        }
        setIsLoading(true);
        mutate(payload, {
            onSuccess: (data) => {
                if (data?.success === true) {
                    toast.success(data?.message);
                } else {
                    toast.error(data?.message);
                }
            },
            onError: () => {
                setIsLoading(false);
                setError("Failed to send reset instructions. Please try again.");
            }
        })
    };

    return (
        <>
        <Seo url={FORGOT_PASSWORD_ROUTE}/>
            <Header />
            <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 form-shadow"
                >
                    {/* Icon Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-soft rounded-full flex items-center justify-center mx-auto mb-4">
                            {isSubmitted ? (
                                <CheckCircle className="w-8 h-8 check-color" />
                            ) : (
                                <KeyRound className="w-8 h-8 text-primary" />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-2">
                            {isSubmitted ? "Check your email" : "Forgot Password?"}
                        </h2>
                        <p className="text-primary2">
                            {isSubmitted
                                ? `We have sent a password reset link to ${email}`
                                : "No worries, we'll send you reset instructions."}
                        </p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-black">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary2" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className={`pl-10 ${error ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-[var(--primary-color)]"}`}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Reset Password"}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <Button
                                onClick={() => window.open('https://gmail.com', '_blank')}
                                size="lg"
                                className="w-full gradient-primary"
                            >
                                Open Email App
                            </Button>
                            <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="outline"
                                className="w-full text-primary2 hover:text-black"
                            >
                                Try another email
                            </Button>
                        </div>
                    )}

                    {/* Back to Login Footer */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center text-sm text-primary2 hover:text-primary transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Log In
                        </button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}