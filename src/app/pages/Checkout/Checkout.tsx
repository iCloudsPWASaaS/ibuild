import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CreditCard, ShieldCheck, ChevronRight, Activity, Wallet, Banknote } from "lucide-react";
import { Button, Header, Footer, SectionHeader } from "../../../components/index";
import { useLocation } from "react-router";
import { usePaymentgateways } from "../../../hooks/usePaymentgateways";
import { useCheckout } from "../../../hooks/useCheckout";
import { toast } from "react-toastify";
import Seo from "../../../components/seo/Seo";
import { CHECKOUT_ROUTE } from "../../../helper/routes";
import { messageData } from "../../../helper/data";
import BraintreePayment from "../../../components/ui/braintreePayment";
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    const icons: { [key: string]: React.ElementType } = {
        CreditCard,
        Wallet,
        Banknote
    };
    const Icon = icons[name] || CreditCard;
    return <Icon className={className} />;
};

interface PaymentMethod {
    _id: string;
    name: string;
    currency: string;
    currencySymbol: string;
    iconName: string;
    fixedCharge: number;
}

export function CheckoutPage() {
    const location = useLocation();
    const { state } = location;
    const { data } = usePaymentgateways();
    const { mutate } = useCheckout();

    const currencysymbol = localStorage.getItem("currencySymbol");
    const currencycode = localStorage.getItem("currency");

    const parsePrice = (priceStr: string | number | undefined) => {
        if (!priceStr) return 499.00;
        if (typeof priceStr === 'number') return priceStr;
        return Number(priceStr.toString().replace(/[^0-9.]/g, ''));
    };

    const amount = parsePrice(state?.price);
    const productName = state?.planName;
    const billingtype = state?.billingCycle;
    const currency = currencycode;
    const productId = state?.productId;
    const discount = state?.discount;
    const discountprice = state?.discountprice;
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [instance, setInstance] = useState<any>(null);

    useEffect(() => {
        if (data) {
            setPaymentMethods(data);
            if (data.length > 0 && !selectedMethod) {
                setSelectedMethod(data[0].name);
            }
        }
    }, [data]);

    const getSelectedMethodDetails = (): PaymentMethod | undefined => {
        return paymentMethods.find(method => method.name === selectedMethod);
    }

    const currentMethod = getSelectedMethodDetails();
    const processingCharge = currentMethod?.fixedCharge ? Number(currentMethod.fixedCharge) : 0;
    const total = amount + processingCharge;
    const methodSymbol = currentMethod?.currencySymbol || currencysymbol;

    const handleConfirmPayment = async () => {
        let payload = {
            gateway: selectedMethod,
            productId: productId,
            billingType: billingtype?.toLowerCase(),
            amount: amount,
            currency: currency,
            charge: processingCharge.toString(),
            nonce: null
        };
        if (selectedMethod == "braintree") {
            if (!instance) {
                toast.error("Payment UI not ready. Please try another method.");
                return;
            }
            const { nonce } = await instance.requestPaymentMethod();
            payload = {
                gateway: selectedMethod,
                productId: productId,
                billingType: billingtype?.toLowerCase(),
                amount: amount,
                currency: currency,
                charge: processingCharge.toString(),
                nonce: nonce
            };
        }
        // return;
        mutate(payload, {
            onSuccess: (data) => {
                if (data.response?.data?.success == false) {
                    toast.error(data.response?.data?.message);
                } else {
                    if (data && data.url && data?.success == true) {
                        window.location.href = data.url;
                    } else {
                        toast.error(data?.message);
                    }
                }
            },
            onError: (error: any) => {
                toast.error(error?.message || error?.response?.data?.success?.message || messageData.error5);
            }
        })
    }

    const onHandlewGateway = (method: string) => {
        setSelectedMethod(method)
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Seo url={CHECKOUT_ROUTE} />
            <Header isWhite={true} />

            <SectionHeader
                variant="hero"
                badge="Secure Payment"
                title="Checkout"
                description="Complete your purchase securely"
            />

            <section className="container mx-auto py-12 px-4 max-w-6xl grow">
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border dark:border-zinc-800 p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-6 text-black  flex items-center gap-2">
                                <CreditCard className="w-6 h-6 text-primary" />
                                Select Payment Method
                            </h2>

                            <div className="grid gap-4">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method._id}
                                        onClick={() => onHandlewGateway(method.name)}
                                        className={`
                                            relative flex items-center justify-between p-5 rounded-xl border transition-all duration-300 cursor-pointer group overflow-hidden
                                            ${selectedMethod === method.name
                                                ? 'bg-blue-50 dark:bg-zinc-800/50 form-shadow'
                                                : 'bg-white border-gray-200 dark:border-zinc-800 hover:border-primary/50'}
                                        `}
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${selectedMethod === method.name ? 'bg-primary' : 'bg-transparent'}`} />

                                        <div className="flex items-center gap-4 z-10">
                                            <div className={`
                                                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0
                                                ${selectedMethod === method.name ? 'border-primary' : 'border-gray-400 dark:border-zinc-600 group-hover:border-gray-500'}
                                            `}>
                                                {selectedMethod === method.name && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                            </div>

                                            <div className="flex flex-col">
                                                <span className={`font-semibold text-lg capitalize transition-colors ${selectedMethod === method.name ? 'text-primary' : 'text-black dark:text-zinc-200'}`}>
                                                    {method.name}
                                                </span>
                                                <span className="text-xs text-primary2 dark:text-zinc-400 font-medium tracking-wide uppercase">
                                                    PAY IN {method.currency}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`
                                            p-3 rounded-lg transition-colors duration-300
                                            ${selectedMethod === method.name ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'}
                                        `}>
                                            <DynamicIcon name={method.iconName} className="w-6 h-6" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border form-shadow p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-black  flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-primary" />
                                    Payment Details
                                </h2>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary2 dark:text-zinc-400">Product</span>
                                    <span className="text-black  font-medium text-right">{productName}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary2 dark:text-zinc-400">Billing Type</span>
                                    <span className="text-black  font-medium capitalize">{billingtype}</span>
                                </div>

                                <div className="border-t dark:border-zinc-800 my-4" />

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary2 dark:text-zinc-400">Amount</span>
                                    <span className="text-black  font-medium">{discountprice} {currency}</span>
                                </div>
                                {(!discount || discount <= 0) ? "" :
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-1 text-primary2 dark:text-zinc-400">
                                            <span>Discount</span>
                                        </div>
                                        <span className="text-red-500 font-medium">- {discount}%</span>
                                    </div>
                                }
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-1 text-primary2 dark:text-zinc-400">
                                        <span>Processing Charge</span>
                                    </div>
                                    <span className="text-red-500 font-medium">+ {methodSymbol}{processingCharge} {currency}</span>
                                </div>

                            </div>

                            <div className="border-t dark:border-zinc-800 pt-4 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-black  font-semibold">Total Payable</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-primary">
                                            {currencysymbol}{total.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-primary2 dark:text-zinc-500 ml-1 font-normal">{currency}</span>
                                    </div>
                                </div>
                            </div>
                            {selectedMethod == "braintree" && <BraintreePayment setInstance={setInstance} />}
                            <Button
                                onClick={handleConfirmPayment}
                                className="w-full  group h-12 text-lg font-bold transition-all"
                            >
                                Confirm Payment
                                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="mt-6 flex items-start gap-3 bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-gray-100 dark:border-zinc-800">
                                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-primary2 dark:text-zinc-400 leading-relaxed">
                                    Your funds are protected by industry-leading encryption. We ensure a secure deposit process with world-class payment options.
                                </p>
                            </div>


                        </div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
