import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import { Button, Footer, Header } from "../../../components/index"; // Adjust path
import { useLocation, useNavigate } from "react-router";
import { useOtp } from "../../../hooks/useOtp";
import { toast } from "react-toastify";
import { useResendotp } from "../../../hooks/ueResentotp";
import Seo from "../../../components/seo/Seo";
import { OTP_VERIFICATION_ROUTE, USER_DASHBOARD_ROUTE } from "../../../helper/routes";

export function OtpVerificationPage() {
    const location = useLocation();
    const email = (location.state as { email: string })?.email || "your email";
    const navigate = useNavigate();
    const { mutate } = useOtp();
    const { mutate: resendOtp } = useResendotp();

    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        setError("");

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");

        if (otpValue.length < 4) {
            setError("Please enter the complete 4-digit code");
            return;
        }
        const payload = {
            email: email,
            otp: otpValue
        };

        setIsLoading(true);
        mutate(payload, {
            onSuccess: (data) => {
                if (data?.success === true) {
                    localStorage.setItem("accessToken", data.token);
                    localStorage.setItem("userData", JSON.stringify(data.user));
                    toast.success(data?.message);
                    setTimeout(() => {
                        navigate(USER_DASHBOARD_ROUTE);
                    }, 500);
                } else {
                    setError(data?.message);
                }
            },
            onError: (error: any) => {
                setError(error?.response?.data?.message || "Verification failed. Please try again.");
            }
        })
    };

    const handleResend = () => {
        if (timer === 0) {
            setTimer(30);
            setOtp(["", "", "", ""]);
            setError("");
            inputRefs.current[0]?.focus();
        }
        const payload = { email: email }
        resendOtp(payload, {
            onSuccess: (data) => {
                toast.success(data?.message);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Resend OTP failed. Please try again.");
            }
        });

    };

    return (
        <>
            <Seo url={OTP_VERIFICATION_ROUTE} />
            <Header />
            <div className="min-h-screen bg-white flex items-center justify-center px-4 my-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 form-shadow "
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-soft rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-2">OTP Verification</h2>
                        <p className="text-primary2">
                            Enter the 4-digit code sent to <br />
                            <span className="font-semibold text-black">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-8">
                        <div className="flex justify-center gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-14 h-14 text-center text-2xl font-bold text-black border rounded-xl outline-none transition-all
                  ${error
                                            ? "border-red-500 bg-red-100 text-red-600"
                                            : "border-gray-800 focus:border-[var(--primary-color)] focus:ring-4 focus:ring-blue-500/10"
                                        }
                `}
                                />
                            ))}
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-red-500 text-sm font-medium"
                            >
                                {error}
                            </motion.p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify & Proceed"}
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-primary2 mb-2">Didn't receive the code?</p>
                        <button
                            onClick={handleResend}
                            disabled={timer > 0}
                            className={`flex items-center justify-center mx-auto text-sm font-medium transition-colors
              ${timer > 0 ? "text-gray-400 cursor-not-allowed" : "text-primary hover:underline"}
            `}
                        >
                            {timer > 0 ? (
                                <>Resend code in 00:{timer < 10 ? `0${timer}` : timer}</>
                            ) : (
                                <>
                                    <RefreshCw className="w-3 h-3 mr-1.5" />
                                    Resend Code
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}