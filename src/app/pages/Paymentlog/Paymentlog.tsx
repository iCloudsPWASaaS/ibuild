import { useState } from "react";
import { motion } from "motion/react";
import { Download, Calendar, CreditCard, CheckCircle, XCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Input, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Footer, Header } from "../../../components/index";
import { GiUpgrade } from "react-icons/gi";
import { usePaymentlog } from "../../../hooks/usePaymentlog";
import { APIURL } from "../../../api/apiurl";
import { PAYMENT_LOG_ROUTE, PRICING_ROUTE } from "../../../helper/routes";
import Seo from "../../../components/seo/Seo";

export function PaymentLogPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const { data, isLoading } = usePaymentlog(page, limit,statusFilter, searchQuery);
    const baseurl = APIURL.BASE_URL;

    const currencySymbol = localStorage.getItem("currencySymbol") || "";

    const statsDisplay = [
        { label: "Total Payment", value: `${currencySymbol}${data?.metrics?.totalpayment}`, icon: CreditCard },
        { label: "successful Payment", value: `${currencySymbol}${data?.metrics?.successful}`, icon: CheckCircle },
        { label: "Failed Payment", value: `${currencySymbol}${data?.metrics?.failed}`, icon: XCircle },
        { label: "This Year Payment", value: `${currencySymbol}${data?.metrics?.yearly}`, icon: Calendar }
    ];
 

    const totalPages = data?.pagination?.totalPages || 1;
    


    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Seo url={PAYMENT_LOG_ROUTE} />
            <Header isWhite={true} />

            <section className="pt-30 pb-20 banner-gradient text-white">
                <div className="container px-4 mx-auto max-w-7xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment History</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {statsDisplay.map((stat, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <stat.icon className="w-5 h-5" />
                                        <span className="text-sm opacity-90">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-6 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 z-40">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary2 dark:text-zinc-400" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-10 dark:bg-zinc-900 dark:border-zinc-800"
                                    value={searchQuery}
                                    onChange={(e) =>{
                                         setSearchQuery(e.target.value);
                                         setPage(1);
                                    }
                                    }
                                />
                            </div>

                            <Select value={statusFilter} onValueChange={(val)=>{
                                setStatusFilter(val);
                                    setPage(1);
                                }}>
                                <SelectTrigger className="w-[130px] dark:bg-zinc-900 dark:border-zinc-800">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="success">Success</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={limit.toString()} onValueChange={(val) => { setLimit(Number(val)); setPage(1); }}>
                                <SelectTrigger className="w-[130px] dark:bg-zinc-900 dark:border-zinc-800">
                                    <SelectValue placeholder="Limit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5 Per Page</SelectItem>
                                    <SelectItem value="10">10 Per Page</SelectItem>
                                    <SelectItem value="20">20 Per Page</SelectItem>
                                    <SelectItem value="50">50 Per Page</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button path={PRICING_ROUTE} className="gradient-primary text-white">
                            <GiUpgrade className="w-4 h-4 mr-2" /> Upgrade Plan
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-12 dark:bg-zinc-950">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border dark:border-zinc-800 overflow-hidden">
                        {isLoading ? (
                            <div className="p-20 text-center">Loading payments...</div>
                        ) : (
                            <>
                                <div className="bg-secondary dark:bg-zinc-800/50 border-b dark:border-zinc-800 px-6 py-4 hidden md:grid md:grid-cols-8  gap-4 font-medium text-sm text-primary2 dark:text-zinc-400">
                                    <div>Transaction ID</div>
                                    <div>Date</div>
                                    <div>Plan</div>
                                    <div>Amount</div>
                                    <div>Total Amount</div>
                                    <div>Method</div>
                                    <div>Status</div>
                                    <div>Invoice</div>
                                </div>

                                <div className="divide-y dark:divide-zinc-800">
                                    {data.transactions?.length > 0 ? (
                                        data.transactions.map((payment: any) => (
                                            <div key={payment._id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <div className="hidden md:grid md:grid-cols-8 gap-4 items-center">
                                                    <div className="font-mono text-xs text-primary2 dark:text-zinc-400">{payment.id}</div>
                                                    <div className="text-sm text-black dark:text-zinc-200">{payment.date}</div>
                                                    <div>
                                                        <div className="font-medium text-black dark:text-white">{payment.plan}</div>
                                                        <div className="text-xs text-primary2 dark:text-zinc-400">{payment.type}</div>
                                                    </div>
                                            <div className="font-medium text-sm text-black dark:text-white"> <span className="font-semibold">{payment.amount}</span></div>
                                                    <div>
                                                        <div className="font-medium text-black dark:text-white">{payment.totalAmount}</div>
                                                        <div className="text-xs text-primary2 dark:text-zinc-400">Includes <span className="badge-text-primary text-[12px]">{payment.charge} Fee</span></div>
                                                    </div>
                                                    {/* <div className="font-medium text-sm text-black dark:text-white"> <span className="font-semibold"></span></div> */}
                                                    <div className="text-sm text-black dark:text-zinc-200">{payment.method}</div>
                                                    <div>
                                                        <Badge variant={payment.status?.toLowerCase() === "success" ? "default" : "destructive"}>
                                                            {payment.status}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        {payment.invoice ? (
                                                            <Button variant="ghost" size="sm" onClick={() => window.open(`${baseurl}${payment.invoice}`, '_blank')} className="text-primary">
                                                                <Download className="w-4 h-4 mr-1" /> Download
                                                            </Button>
                                                        ) : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-20 text-center text-zinc-500">No records found.</div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                            </Button>

                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i + 1}
                                    variant={page === i + 1 ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPage(i + 1)}
                                    className={page === i + 1 ? "bg-primary text-white border-primary" : ""}
                                >
                                    {i + 1}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}