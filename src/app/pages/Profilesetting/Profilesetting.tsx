import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Lock, Bell, CreditCard, Camera, Save, Trash2, AlertTriangle } from "lucide-react";
import { Button, Input, Label, Textarea, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsContent, TabsList, TabsTrigger, Footer, Header, SectionHeader } from "../../../components/index";
import { useProfileinfo } from "../../../hooks/useProfileinfo";
import { useUpdateNotifications } from "../../../hooks/usernotification"
import { useChangepassword } from "../../../hooks/useChangepassword";
import { useUserdata } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { APIURL } from "../../../api/apiurl";
import { useCountry } from "../../../hooks/useCountry";
import { useQuery } from "@tanstack/react-query";
import { getstate } from "../../../api/baseapi";
import { useDeleteAccount } from "../../../hooks/useDeleteaccount";
import { useCancelSubscription } from "../../../hooks/useCancelSubscription";
import { useNavigate, useSearchParams } from "react-router";
import { PRICING_ROUTE, HOME_ROUTE, PROFILE_SETTING_ROUTE, CHECKOUT_ROUTE } from "../../../helper/routes";
import Seo from "../../../components/seo/Seo";

export function ProfileSettingsPage() {

    const token = localStorage.getItem("accessToken") || "";
    const { data, isLoading, refetch } = useUserdata(token)
    const country = useCountry();
    const navigate = useNavigate();
    const { mutate: updateProfile } = useProfileinfo();
    const { mutate: changePassword } = useChangepassword();
    const { mutate: deleteAccount } = useDeleteAccount();
    const { mutate: cancelSubscription, isPending: isCancelSubscriptionPending } = useCancelSubscription();
    const { mutate } = useUpdateNotifications();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const baseurl = APIURL.BASE_URL;
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "profile";
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
    const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
    const [aiCredit, setAiCredit] = useState("5");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const subscription = data?.subscription;
    const costLimit = subscription?.costLimit ?? subscription?.monthlyCostLimit ?? 0;
    const billingPeriod = subscription?.billingType === "yearly" ? "year" : "month";
    const isStripeSubscription = subscription?.gateway === "stripe" && !!subscription?.stripeSubscriptionId;
    const topupCredit = Number(subscription?.aiUsage?.topupCredit || 0);
    const aiCreditValue = Number(aiCredit);
    const isAiCreditValid = Number.isFinite(aiCreditValue) && aiCreditValue >= 5 && aiCreditValue <= 100;
    const aiTopupCharge = (Number.isFinite(aiCreditValue) ? aiCreditValue * 1.2 : 0).toFixed(2);
    console.log(" data?.user---", data?.user?.isPass)
    const [profileData, setProfileData] = useState({
        firstName: data?.user?.firstName || "",
        lastName: data?.user?.lastName || "",
        email: data?.user?.email || "",
        phone: data?.user?.phone || "",
        country: data?.user?.country || "",
        state: data?.user?.state || "",
        bio: data?.user?.bio || "",
        avatar: data?.user?.avatar || null
    });

    useEffect(() => {
        if (data?.user) {
            setProfileData({
                firstName: data.user.firstName || "",
                lastName: data.user.lastName || "",
                email: data.user.email || "",
                phone: data.user.phone || "",
                country: data.user.country || "",
                state: data.user.state || "",
                bio: data.user.bio || "",
                avatar: data.user.avatar || null
            })
        }
    }, [data])

    const selectedCountry = useMemo(() => {
        return country?.data?.data?.find((c: any) => c.name === profileData.country);
    }, [country?.data?.data, profileData.country]);

    const { data: states } = useQuery({
        queryKey: ['statedata', selectedCountry?._id],
        queryFn: () => getstate(selectedCountry?._id),
        enabled: !!selectedCountry?._id,
        staleTime: 1000 * 60 * 5,
    });

    const [securityData, setSecurityData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [notifications, setNotifications] = useState({
        email: false,
        marketing: false,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileData((prev) => ({ ...prev, avatar: file }));
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleProfileSubmit = (e: any) => {
        e.preventDefault()

        if (profileData.country == "") {
            toast.error("Please select your country")
            return;
        }

        const formData = new FormData();
        formData.append("firstName", profileData.firstName);
        formData.append("lastName", profileData.lastName);
        formData.append("email", profileData.email);
        formData.append("phone", profileData.phone);
        formData.append("country", profileData.country);
        formData.append("state", profileData.state);
        formData.append("bio", profileData.bio);

        if (profileData.avatar instanceof File) {
            formData.append("avatar", profileData.avatar);
        }

        updateProfile(formData, {
            onSuccess: (data) => {
                if (data.success === true) {
                    toast.success(data.message);
                    localStorage.setItem("userData", JSON.stringify(data?.data));
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    toast.error(data?.message || "Failed to update profile.");
                }
            },
            onError: (error) => {
                toast.error(error?.message || "Failed to update profile.");
            }
        });
    };

    const handleSecuritySubmit = () => {
        changePassword(securityData, {
            onSuccess: (data) => {
                if (data.success === true) {
                    toast.success(data.message);
                           setSecurityData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
                } else {
                    toast.error(data?.message || "Failed to change password.");
                }
            },
            onError: (error) => {
                toast.error(error?.message || "Failed to change password.");
                  setSecurityData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
            }
        })
      
    };

    useEffect(() => {
        if (data?.user) {
            setNotifications({
                email: data.user.emailNotifications === 1,
                marketing: data.user.marketingEmails === 1,
            });
        }
    }, [data]);

    const handleNotificationsSubmit = () => {
        mutate(
            {
                emailNotifications: notifications.email ? 1 : 0,
                marketingEmails: notifications.marketing ? 1 : 0,
            },
            {
                onSuccess: (data) => {
                    if(data?.success){
                    toast.success(data?.message || "Notification Preferences updated");

                    }else{
                    toast.error(data?.message || "Notification Preferences failed");

                    }
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            }
        );
    };

    const handledeleteAccount = () => {
        deleteAccount(undefined, {
            onSuccess: (data) => {
                if (data.success === true) {
                    toast.success(data.message);
                    navigate(HOME_ROUTE);
                    localStorage.clear();
                } else {
                    toast.error(data?.message || "Failed to delete account.");
                }
                setIsDeleteModalOpen(false);
            },
            onError: () => {
                setIsDeleteModalOpen(false);
            }
        })
    };

    const handleBuyMoreAiUsage = () => {
        if (!isAiCreditValid) return;
        navigate(CHECKOUT_ROUTE, {
            state: {
                planName: "AI Usage Top-up",
                purchaseType: "ai_topup",
                aiCreditUsd: Number(aiCreditValue),
                price: (aiCreditValue * 1.2).toFixed(2),
                productId: subscription?.planId,
                billingCycle: "monthly"
            }
        });
        setIsTopupModalOpen(false);
    };

    const handleCancelSubscription = () => {
        cancelSubscription(undefined, {
            onSuccess: (response: { success?: boolean; message?: string } | undefined) => {
                setIsCancelSubscriptionModalOpen(false);
                if (response?.success === false) {
                    toast.error(response?.message || "Failed to cancel subscription.");
                    return;
                }
                toast.success(response?.message || "Subscription cancellation scheduled.");
                refetch();
            },
            onError: (error) => {
                const axiosError = error as Error & { response?: { data?: { message?: string } } };
                setIsCancelSubscriptionModalOpen(false);
                toast.error(axiosError.response?.data?.message || axiosError.message || "Failed to cancel subscription.");
            }
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 relative">
            <Seo url={PROFILE_SETTING_ROUTE} />
            <Header isWhite={true} loading={isLoading} />

            <SectionHeader
                variant="hero"
                badge={data?.badge}
                title={data?.title}
                description={data?.description}
            />

            <section className="container mx-auto py-12 px-4">
                <div className="container mx-auto max-w-5xl">
                    <Tabs value={activeTab}
                        onValueChange={(value) => setSearchParams({ tab: value })}
                        className="space-y-8">
                        <TabsList className="grid w-full grid-cols-5 gap-1 md:gap-2 bg-gray-100 dark:bg-zinc-900 p-1 md:p-2 rounded-xl">
                            <TabsTrigger value="profile" className="flex items-center gap-2">
                                <User className="w-5 h-5 md:w-4 md:h-4" />
                                <span className="hidden md:inline">Profile</span>
                            </TabsTrigger>
                            <TabsTrigger value="account" className="flex items-center gap-2">
                                <Mail className="w-5 h-5 md:w-4 md:h-4" />
                                <span className="hidden md:inline">Account</span>
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center gap-2">
                                <Lock className="w-5 h-5 md:w-4 md:h-4" />
                                <span className="hidden md:inline">Security</span>
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="flex items-center gap-2">
                                <Bell className="w-5 h-5 md:w-4 md:h-4" />
                                <span className="hidden md:inline">Notifications</span>
                            </TabsTrigger>
                            <TabsTrigger value="billing" className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 md:w-4 md:h-4" />
                                <span className="hidden md:inline">Billing</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border dark:border-zinc-800 p-6 md:p-8"
                            >
                                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Personal Information</h2>
                                <form onSubmit={handleProfileSubmit} action="">
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b dark:border-zinc-800 text-center md:text-left">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                            <div className="w-24 h-24 uppercase banner-gradient rounded-full flex items-center justify-center text-white font-bold text-3xl overflow-hidden">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                ) : profileData.avatar ? (
                                                    <img src={baseurl + profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    profileData.firstName?.charAt(0) || "U"
                                                )}
                                            </div>
                                            <button
                                                onClick={triggerFileInput}
                                                className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-lg border-2 border-primary flex items-center justify-center hover:bg-purple-50 dark:hover:bg-zinc-700 transition-colors"
                                            >
                                                <Camera className="w-4 h-4 text-primary" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl mb-1 text-black dark:text-white">{profileData.firstName || "User"}</h3>
                                            <p className="text-primary2 dark:text-zinc-400 mb-3">{profileData.email}</p>
                                            <Button
                                                onClick={triggerFileInput}
                                                size="sm"
                                                variant="outline"
                                                className="text-black dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                            >
                                                <Camera className="w-4 h-4 mr-2" />
                                                Change Photo
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-black dark:text-zinc-200">First Name</Label>
                                            <Input
                                                required
                                                id="firstName"
                                                value={profileData.firstName}
                                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-black dark:text-zinc-200">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={profileData.lastName}
                                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-black dark:text-zinc-200">Email Address</Label>
                                            <Input id="email" type="email" disabled value={profileData.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-black dark:text-zinc-200">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country" className="text-black dark:text-zinc-200">Country*</Label>
                                            <Select
                                                value={profileData.country}
                                                onValueChange={(value) => value && setProfileData({ ...profileData, country: value, state: "" })}
                                            >
                                                <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                                                <SelectContent className="max-h-75 overflow-y-auto">
                                                    {country?.data?.data?.map((item: any) => (
                                                        <SelectItem key={item._id} value={item.name}>{item.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state" className="text-black dark:text-zinc-200">State</Label>
                                            <Select
                                                value={profileData.state}
                                                onValueChange={(value) => value && setProfileData({ ...profileData, state: value })}
                                                disabled={!profileData.country}
                                            >
                                                <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                                                <SelectContent className="max-h-75 overflow-y-auto">
                                                    {states?.data?.map((item: any) => (
                                                        <SelectItem key={item._id} value={item.name}>{item.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="bio" className="text-black dark:text-zinc-200">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                rows={4}
                                                placeholder="Tell us about yourself..."
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-3 mt-8 pt-6 border-t dark:border-zinc-800">
                                        <Button type="submit" className="w-full md:w-auto gradient-primary text-white">
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="account">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border dark:border-zinc-800 p-6 md:p-8">
                                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Account Settings</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="username" className="text-black dark:text-zinc-200">Username</Label>
                                            <Input
                                                id="username"
                                                className="mt-2"
                                                value={(profileData.firstName + profileData.lastName).toLowerCase().replace(/\s/g, '') || "user"}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-red-900 dark:text-red-400 mb-4">Danger Zone</h2>
                                    <p className="text-red-700 dark:text-red-300 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                    <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)} className="w-full sm:w-auto">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Account
                                    </Button>
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="security">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border dark:border-zinc-800 p-6 md:p-8">
                                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Security Settings</h2>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 text-black dark:text-white">Change Password</h3>
                                        <div className="space-y-4">
                                            {(data?.user?.isPass === true) &&
                                                <div className="space-y-2">
                                                    <Label className="text-black dark:text-zinc-200">Current Password</Label>
                                                    <Input type="password" value={securityData.currentPassword} onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })} />
                                                </div>
                                            }
                                            <div className="space-y-2">
                                                <Label className="text-black dark:text-zinc-200">New Password</Label>
                                                <Input type="password" value={securityData.newPassword} onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-black dark:text-zinc-200">Confirm New Password</Label>
                                                <Input type="password" value={securityData.confirmPassword} onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })} />
                                            </div>
                                            <Button onClick={handleSecuritySubmit} className="w-full md:w-auto gradient-primary text-white">Update Password</Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="notifications">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border dark:border-zinc-800 p-6 md:p-8">
                                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Notification Preferences</h2>
                                <div className="space-y-6">
                                    {[{ key: "email", title: "Email Notifications", desc: "Receive updates and alerts via email" },
                                    { key: "marketing", title: "Marketing Emails", desc: "Receive promotional content and news" },].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                                            <div>
                                                <h3 className="font-medium mb-1 text-black dark:text-white text-sm md:text-base">{item.title}</h3>
                                                <p className="text-xs md:text-sm text-primary2 dark:text-zinc-400">{item.desc}</p>
                                            </div>
                                            <Switch
                                                checked={notifications[item.key as "email" | "marketing"]}
                                                onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-3 mt-8 pt-6 border-t dark:border-zinc-800">
                                    <Button onClick={handleNotificationsSubmit} className="w-full md:w-auto gradient-primary text-white">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Preferences
                                    </Button>
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="billing">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border dark:border-zinc-800 p-6 md:p-8">
                                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Current Plan</h2>
                                    {isStripeSubscription && (
                                        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                                            <span className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${subscription?.cancelAtPeriodEnd ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"}`}>
                                                {subscription?.cancelAtPeriodEnd ? "Cancellation scheduled" : "Auto-renews"}
                                            </span>
                                            {!subscription?.cancelAtPeriodEnd && (
                                                <Button variant="outline" size="sm" onClick={() => setIsCancelSubscriptionModalOpen(true)} className="text-black dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800">
                                                    Cancel at period end
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                    {data?.subscription?.isActive ? (
                                        <div className="gradient-primary hover-primary text-white rounded-xl p-6 mb-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold">{data?.subscription?.planName}</h3>
                                                    <p className="opacity-90">{data?.subscription?.billingType === "yearly" ? "Yearly Plan" : "Monthly Plan"}</p>
                                                </div>
                                                <Button onClick={() => navigate(PRICING_ROUTE)} variant="secondary" className="dark:text-black w-full sm:w-auto">Upgrade</Button>
                                            </div>
                                            {data?.subscription?.endDate && <p className="opacity-90 text-sm">Next billing date: {data?.subscription?.endDate ? new Date(data.subscription.endDate).toDateString() : ""}</p>}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-10 mb-6 text-center border-2 border-dashed border-gray-300 dark:border-zinc-700">
                                            <p className="text-gray-600 dark:text-zinc-400 font-medium mb-4">No active plan found. Purchase a plan to get started.</p>
                                            <Button onClick={() => navigate(PRICING_ROUTE)} className="gradient-primary text-white">Purchase Plan</Button>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="p-4 bg-badge-primary rounded-xl text-center">
                                            <div className="text-3xl font-bold badge-text-primary">{data?.subscription?.totalWebsite === 0 ? "Unlimited" : data?.subscription?.totalWebsite}</div>
                                            <div className="text-sm text-primary2 dark:text-zinc-400 mt-1">Total Websites</div>
                                        </div>
                                        <div className="p-4 bg-badge-primary rounded-xl text-center">
                                            <div className="text-3xl font-bold badge-text-primary">{data?.subscription?.websiteCreated}</div>
                                            <div className="text-sm text-primary2 dark:text-zinc-400 mt-1">Created Websites</div>
                                        </div>
                                        <div className="p-4 bg-badge-primary rounded-xl text-center">
                                            <div className="text-3xl font-bold badge-text-primary">{data?.subscription?.totalWebsite === 0 ? "Unlimited" : data?.subscription?.websiteremaining}</div>
                                            <div className="text-sm text-primary2 dark:text-zinc-400 mt-1">Remaining Websites</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                        <div className="p-4 bg-badge-primary rounded-xl text-center">
                                            <div className="text-3xl font-bold badge-text-primary">${Number(subscription?.aiUsage?.cost || 0).toFixed(2)}</div>
                                            <div className="text-sm text-primary2 dark:text-zinc-400 mt-1">
                                                AI Usage {!subscription ? "(No active plan)" : costLimit === 0 ? "(Unlimited)" : `of $${costLimit} / ${billingPeriod}`}
                                            </div>
                                            {topupCredit > 0 && (
                                                <div className="mt-2 inline-flex rounded-full bg-badge-primary px-3 py-1 text-xs font-medium text-primary2 dark:text-zinc-400">
                                                    Top-up credit: ${topupCredit.toFixed(2)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 bg-badge-primary rounded-xl text-center">
                                            <div className="text-3xl font-bold badge-text-primary">{Number(subscription?.aiUsage?.totalTokens || 0).toLocaleString()}</div>
                                            <div className="text-sm text-primary2 dark:text-zinc-400 mt-1">AI Tokens Used</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <Button onClick={() => { setAiCredit("5"); setIsTopupModalOpen(true); }}>Buy more AI usage</Button>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <Footer />
            <AnimatePresence>
                {isTopupModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border dark:border-zinc-800">
                            <div className="p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Buy more AI usage</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">Add AI credit to your current billing period.</p>
                                <div className="mt-6 space-y-2">
                                    <Label htmlFor="aiCredit" className="text-black dark:text-zinc-200">AI credit (USD)</Label>
                                    <Input
                                        id="aiCredit"
                                        type="number"
                                        min={5}
                                        max={100}
                                        step={0.01}
                                        value={aiCredit}
                                        onChange={(e) => setAiCredit(e.target.value)}
                                    />
                                    <p className="text-xs text-primary2 dark:text-zinc-400">Minimum $5 · Maximum $100</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-zinc-800/50 px-4 py-3 text-sm">
                                    <span className="text-primary2 dark:text-zinc-400">Charge</span>
                                    <span className="font-bold text-black dark:text-white">${aiTopupCharge}</span>
                                </div>
                                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                                    <Button variant="outline" onClick={() => setIsTopupModalOpen(false)} className="text-gray-700 dark:text-zinc-200 dark:border-zinc-700">Cancel</Button>
                                    <Button onClick={handleBuyMoreAiUsage} disabled={!isAiCreditValid}>Continue to checkout</Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isCancelSubscriptionModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border dark:border-zinc-800">
                            <div className="p-6 md:p-8 text-center">
                                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cancel auto-renewal?</h3>
                                <p className="text-gray-500 dark:text-zinc-400 mb-8">Your plan stays active until the end of the current billing period.</p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button variant="outline" onClick={() => setIsCancelSubscriptionModalOpen(false)} disabled={isCancelSubscriptionPending} className="text-gray-700 dark:text-zinc-200 border-gray-300 dark:border-zinc-700">Keep auto-renewal</Button>
                                    <Button variant="destructive" onClick={handleCancelSubscription} disabled={isCancelSubscriptionPending}>Confirm cancellation</Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border dark:border-zinc-800">
                            <div className="p-6 md:p-8 text-center">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Are you sure?</h3>
                                <p className="text-gray-500 dark:text-zinc-400 mb-8">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="w-full sm:w-auto text-gray-700 dark:text-zinc-200 border-gray-300 dark:border-zinc-700">Cancel</Button>
                                    <Button variant="destructive" onClick={handledeleteAccount} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">Yes, Delete Account</Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}