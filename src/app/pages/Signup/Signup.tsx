import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { Button, Input, Label, Checkbox } from "../../../components/index";
import { useNavigate } from "react-router";
import { useSignup } from "../../../hooks/useSignup";
import { APIURL } from "../../../api/apiurl";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    OTP_VERIFICATION_ROUTE,
    PRIVACY_POLICY_ROUTE,
    REGISTER_ROUTE,
    TERMS_OF_SERVICE_ROUTE
} from "../../../helper/routes";

type FormDataType = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
};

type ErrorsType = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: string;
};

type FormFields = keyof FormDataType;

export function SignUpPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate, isPending } = useSignup();

    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    });

    const [errors, setErrors] = useState<ErrorsType>({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        const field = id as FormFields;
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
        if (errors.agreeToTerms) {
            setErrors((prev) => ({ ...prev, agreeToTerms: "" }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: ""
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) {
            newErrors.name = "First Name is required";
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email Address is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const email = formData.email;
            mutate(formData, {
                onSuccess: (data) => {
                    if (data?.success === true) {
                        setFormData({
                            name: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            agreeToTerms: false
                        });
                        toast.success(data?.message);
                        setTimeout(() => {
                            navigate(OTP_VERIFICATION_ROUTE, { state: { email } });
                        }, 1000);
                    } else {
                        toast.error(data?.message);
                    }
                },
                onError: (error: unknown) => {
                    const message =
                        typeof error === "object" && error !== null && "response" in error
                            ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                            : undefined;
                    toast.error(message || "Signup failed. Please try again.");
                }
            });
        }
    };

    const handleLoginWithGoogle = () => {
        window.open(APIURL.API_URL + APIURL.GET_LOGIN_GOOGLE, "_self");
    }

    const handleLoginWithGithub = () => {
        window.open(APIURL.API_URL + APIURL.GET_LOGIN_GITHUB, "_self");
    }

    return (
        <>
            <Seo url={REGISTER_ROUTE} />
            <div className="agi-theme min-h-screen bg-background text-[#0f172a] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <a href={HOME_ROUTE} className="inline-flex items-center justify-center gap-3 mb-6">
                            <img src="/logo.png" alt="IClouds AI logo" className="h-10 w-10 object-contain" />
                            <div className="flex flex-col items-start gap-1">
                                <span className="agi-display text-2xl tracking-[0.16em] uppercase text-primary">
                                    IClouds AI
                                </span>
                                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                                    AI services made simple
                                </span>
                            </div>
                        </a>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a]">Create your account</h1>
                        <p className="mt-3 text-base text-[#475569]">
                            Set up IClouds AI and start getting work done with AI.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white border border-[#e2e8f0] p-6 md:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#0f172a]">Sign up</h2>
                            <p className="mt-1 text-sm text-[#475569]">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate(LOGIN_ROUTE)}
                                    className="font-medium text-[#2563eb]"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[#0f172a]">First name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="First name"
                                            className="h-11 pl-10"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-[#0f172a]">Last name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Last name"
                                            className="h-11 pl-10"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#0f172a]">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="h-11 pl-10"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[#0f172a]">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        className="h-11 pl-10 pr-10"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2563eb]"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-[#0f172a]">Confirm password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        className="h-11 pl-10 pr-10"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2563eb]"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={handleCheckboxChange}
                                    />
                                    <label
                                        htmlFor="agreeToTerms"
                                        className="text-sm text-[#475569] cursor-pointer leading-relaxed"
                                    >
                                        I agree to the{" "}
                                        <a href={TERMS_OF_SERVICE_ROUTE} className="font-medium text-[#2563eb]">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href={PRIVACY_POLICY_ROUTE} className="font-medium text-[#2563eb]">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>
                                {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
                            </div>

                            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                                {isPending ? 'Creating...' : "Create account"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            <div className="relative flex items-center justify-center text-sm text-[#64748b]">
                                <span className="relative px-2 before:content-[''] before:absolute before:top-1/2 before:-left-full before:w-full before:h-px before:bg-[#e2e8f0] before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:-right-full after:w-full after:h-px after:bg-[#e2e8f0] after:-translate-y-1/2">
                                    Or continue with
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button onClick={handleLoginWithGoogle} type="button" className="w-full">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button onClick={handleLoginWithGithub} type="button" className="w-full">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    GitHub
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <Button variant="link" onClick={() => navigate(HOME_ROUTE)}>
                                ← Back to Home
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-[#94a3b8]">
                        Simple AI services for everyday work.
                    </p>
                </div>
            </div>
        </>
    );
}
