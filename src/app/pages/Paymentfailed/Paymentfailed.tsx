import { motion } from "motion/react";
import { XCircle, RefreshCw, LifeBuoy, AlertTriangle } from "lucide-react";
import { Button, Header } from "../../../components/index";
import { useNavigate } from "react-router-dom";
import { CONTACT_US_ROUTE, PAYMENT_FAILED_ROUTE, PRICING_ROUTE } from "../../../helper/routes";
import Seo from "../../../components/seo/Seo";

export function PaymentFailedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white  flex flex-col">
            <Seo url={PAYMENT_FAILED_ROUTE} />
            <Header />

            <div className="grow flex items-center justify-center py-20 px-4 ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white btn-shadow dark:bg-zinc-900 w-full max-w-md rounded-3xl shadow-xl border dark:border-zinc-800 overflow-hidden relative"
                >
                    {/* Decorative Top Accent */}
                    <div className="h-2 w-full bg-red-500" />

                    <div className="p-8 text-center">
                        <motion.div
                            initial={{ rotate: -45, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                            className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                        </motion.div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Failed</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                            We couldn't process your payment. Don't worry, no funds have been deducted from your account.
                        </p>

                        {/* Help / Reasons Section */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-xl p-4 mb-8 text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                                <span className="font-semibold text-yellow-700 dark:text-yellow-500 text-sm">Common reasons:</span>
                            </div>
                            <ul className="list-disc list-inside text-xs text-yellow-800 dark:text-yellow-400/80 space-y-1 ml-1">
                                <li>Insufficient funds in the account</li>
                                <li>Incorrect card details (CVV or Expiry)</li>
                                <li>Bank declined the international transaction</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate(PRICING_ROUTE)}
                                className="w-full  text-white h-12 text-lg shadow-lg"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" /> Try Again
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full hover:bg-gray-50 dark:hover:bg-zinc-800"
                                onClick={() => navigate(CONTACT_US_ROUTE)}
                            >
                                <LifeBuoy className="w-4 h-4 mr-2" /> Contact Support
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}