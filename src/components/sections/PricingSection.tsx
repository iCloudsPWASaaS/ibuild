import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, Sparkles } from "lucide-react";
import { Button, Badge, SectionHeader } from "../ui/index";
import { useNavigate } from "react-router-dom";
import { usePricing } from "../../hooks/usePricing";
import { CHECKOUT_ROUTE } from "../../helper/routes";

interface Pricingprops {
    headerVariant?: "section" | "hero",
    onGetStarted?: () => void;
    setIsMinLoading?: (show: boolean) => void;
}

interface PricingPlan {
    id?: string;
    name?: string;
    description?: string;
    price?: string;
    isfree?: boolean;
    discount?: number;
    discountprice?: string;
    savings?: string;
    cta?: string;
    popular?: boolean;
    isactive?: boolean;
    limits?: {
        websites?: number | string;
        aiSpendUsd?: number | string;
    };
}

export function PricingSection({ onGetStarted, headerVariant, setIsMinLoading }: Pricingprops) {

    const navigate = useNavigate();
    const { data, isLoading } = usePricing()
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");


    useEffect(() => {
        if (setIsMinLoading) setIsMinLoading(isLoading);
    }, [isLoading, setIsMinLoading]);

    const handleGetStarted = (plan: PricingPlan) => {
        if (onGetStarted) {
            onGetStarted();
        } else {
            navigate(CHECKOUT_ROUTE, {
                state: {
                    planName: plan.name,
                    price: plan.price,
                    billingCycle: billingCycle,
                    productId: plan.id,
                    discount: plan.discount,
                    discountprice: plan.discountprice
                }
            });
        }
    };

    const activePlans = data?.plans[billingCycle];

    const serviceLabel = (plan: PricingPlan) => {
        const count = Number(plan?.limits?.websites || 0);
        if (count === 0) return "Unlimited AI services";
        const period = plan?.isfree || billingCycle === "monthly" ? "month" : "year";
        return `${count} AI service${count === 1 ? "" : "s"} / ${period}`;
    };

    const aiLabel = (plan: PricingPlan) => {
        const amount = Number(plan?.limits?.aiSpendUsd || 0);
        const period = plan?.isfree || billingCycle === "monthly" ? "month" : "year";
        return amount === 0 ? "Unlimited AI usage" : `$${amount} AI usage / ${period}`;
    };

    return (
        <section id="pricing" className="md:px-0  py-20  md:pb-20">
            <SectionHeader
                variant={headerVariant}
                badge={undefined}
                special=""
                title="Pay for the AI work you need"
                description="Choose how many AI services you want to run. AI usage is shown clearly — no website builder jargon."
            />
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-8 lg:mb-12">
                    <div className="inline-flex items-center gap-2 sm:gap-3 p-1 bg-white rounded-lg border shadow-sm  max-w-full overflow-hidden">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base transition-colors ${billingCycle === "monthly" ? "bg-secondary text-primary2 hover-primary text-primary2" : "text-primary2 hover-primary"}`}
                        >
                            {data?.toggle?.monthly}
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base flex items-center transition-colors ${billingCycle === "yearly" ? "bg-secondary  text-primary2" : "text-primary2 hover-primary"}`}
                        >
                            {data?.toggle?.yearly}
                            {data?.toggle?.discountBadge > 0 && (
                                <Badge variant="default" className="ml-2 whitespace-nowrap hidden sm:inline-flex">
                                    <span>save {data.toggle.discountBadge} %</span>
                                </Badge>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                    <AnimatePresence mode="wait">
                        {activePlans?.map((plan: PricingPlan, index: number) => (
                            <motion.div
                                key={`${billingCycle}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`relative bg-white rounded-2xl p-6 lg:p-8 border-2 border-soft ${plan.popular ? "border-primary shadow-2xl lg:scale-105 z-10" : "border-gray-200 shadow-lg"}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <Badge variant={'popular'} className="text-white px-4 py-1 shadow-md">Most Popular</Badge>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2 text-black">{plan?.name}</h3>
                                    <p className="text-primary2 text-sm mb-4">{plan?.description}</p>
                                    {plan?.isfree ?
                                       <div className="flex items-end gap-2">
                                          <span className="text-4xl lg:text-5xl font-bold text-black">Free</span>
                                       </div>
                                        :
                                        <div className="flex items-end gap-2">
                                            <span className="text-4xl lg:text-5xl font-bold text-black">{plan?.price}</span>
                                            {(!plan?.discount || plan?.discount <= 0) ? "" : <span className="text-2xl line-through text-primary2 mb-2">{plan?.discountprice}</span>}
                                         </div>
                                    }
                                    {plan?.savings ? 
                                        <p className="text-sm check-color mt-2">{plan?.savings}</p>
                                        :
                                        <p className="text-sm check-color mt-2">&nbsp;</p>
                                    }
                                </div>

                                <Button
                                    size="lg"
                                    className={`w-full mb-6 ${plan?.isactive ? "gradient-primary from-blue-500 to-purple-500 text-white cursor-not-allowed" : "hover-primary"
                                        }`}
                                    variant={
                                        plan?.isactive
                                            ? "secondary"
                                            : plan?.popular
                                                ? "popular"
                                                : "normal"
                                    }
                                    onClick={() => !plan?.isactive && handleGetStarted(plan)}
                                >
                                    {plan?.cta}
                                </Button>


                                <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-primary2/70 mb-3">What&apos;s included</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <Bot className="w-4 h-4 check-color" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-black">AI services</p>
                                                <p className="text-sm text-primary2">{serviceLabel(plan)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                                                <Sparkles className="w-4 h-4 check-color" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-black">AI usage</p>
                                                <p className="text-sm text-primary2">{aiLabel(plan)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}