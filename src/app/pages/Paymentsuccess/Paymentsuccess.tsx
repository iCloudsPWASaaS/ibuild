import { motion } from "motion/react";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Button, Header, } from "../../../components/index";
import { useNavigate } from "react-router-dom";
import { USER_DASHBOARD_ROUTE, HOME_ROUTE, PAYMENT_SUCCESS_ROUTE } from "../../../helper/routes";
import Seo from "../../../components/seo/Seo";

export function PaymentSuccessPage() {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Seo url={PAYMENT_SUCCESS_ROUTE} />
            <Header />
            <div className="grow flex items-center justify-center py-20 px-4 ">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-zinc-900 w-full btn-shadow max-w-md rounded-3xl shadow-xl border dark:border-zinc-800 overflow-hidden relative"
                >
                    {/* Decorative Top Accent */}
                    <div className="h-2 w-full bg-green-500" />

                    <div className="p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </motion.div>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                            Thank you for your purchase. Your account has been upgraded securely.
                        </p>



                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate(USER_DASHBOARD_ROUTE)}
                                className="w-full gradient-primary text-white h-12 text-lg shadow-lg hover:shadow-primary/25"
                            >
                                Go to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <div className="w-full">
                                <Button variant="outline" className="mt-5 w-sm" onClick={() => navigate(HOME_ROUTE)}>
                                    <Home className="w-4 h-4 mr-2" /> Home
                                </Button>

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}