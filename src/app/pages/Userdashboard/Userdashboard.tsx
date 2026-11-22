import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    Edit,
    Sparkles, Globe, TrendingUp, Eye, Users, Plus, ArrowRight,
    Settings, Activity, Clock, BarChart3, PieChart, Calendar, Download,
    Ticket,
    Pencil,
    BadgeCheck,
    Trash2
} from "lucide-react";
import { Button, Badge, Input, TimerCount } from "../../../components/ui/index";
import { Footer, Header } from "../../../components";
import { useDashboard, userWebsiteAnalytics } from "../../../hooks/useDashboard";
import { useWebhistorydata, useDeleteProject } from "../../../hooks/useWebhistory";

import Seo from "../../../components/seo/Seo";
import { USER_DASHBOARD_ROUTE } from "../../../helper/routes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/index"
import { APIURL } from "../../../api/apiurl";
import { formatDate, getSingleDesignStyleData } from "../../../helper/function";
import { useNavigate } from "react-router-dom";

const baseurl = APIURL.BASE_URL;

const gradientClasses = {
    chart: "gradient-primary hover-primary",
    chartHover: "hover:from-purple-700 hover:to-blue-600 dark:hover:from-purple-600 dark:hover:to-blue-500"
};

const statsStaticConfig = [
    {
        icon: Globe,
        gradient: "dashboard-stat-blue"
    },
    {
        icon: Eye,
        gradient: "dashboard-stat-purple"
    },
    {
        icon: Users,
        gradient: "dashboard-stat-orange"
    },
    {
        icon: TrendingUp,
        gradient: "dashboard-stat-green"
    }
];


const quickActionsConfig = [
    { label: "Create Project", link: "/websitetype", icon: Plus, gradient: "dashboard-stat-purple" },
    { label: "Pricing Plan", link: "/pricing", icon: BarChart3, gradient: "dashboard-stat-blue" },
    { label: "Project History", link: "/webhistory", icon: Globe, gradient: "dashboard-stat-orange" },
    { label: "Account Settings", link: "/profilesetting", icon: Settings, gradient: "dashboard-stat-green" },
    { label: "Support", link: "/supporttickets", icon: Ticket, gradient: "dashboard-stat-indigo" },
    { label: "Payment History", link: "/paymentlog", icon: PieChart, gradient: "dashboard-stat-pink" }
];
const gradients = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-orange-500 to-orange-600",
    "from-green-500 to-green-600",
    "from-indigo-500 to-indigo-600"
];

export function UserDashboard() {
    const [analyticsFilter, setAnalyticsFilter] = useState("yearly");
    const [customDates, setCustomDates] = useState({ start: "", end: "" });
    const { data, isLoading, refetch: dashrefetch } = useDashboard();
    const navigate = useNavigate();
    const { data: recentWebsitesData, isLoading: webisLoading, refetch } = useWebhistorydata(4);
    const recentWebsites = recentWebsitesData?.data || [];
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

    const handleDeleteProject = (website: any) => {
        if (!window.confirm(`Delete "${website.websiteName}"? This cannot be undone.`)) return;
        deleteProject(website._id, {
            onError: () => window.alert("Failed to delete project. Please try again."),
        });
    };

    const websiteAnalytics = userWebsiteAnalytics(analyticsFilter, customDates.start, customDates.end);
    const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "{}") : null;

    // 🔥 route change pe data refresh
    useEffect(() => {
        refetch();
        dashrefetch();
    }, [navigate]);




    function activityIcons(icontype: string) {
        if (icontype && icontype == "plan_active") {
            return BadgeCheck
        } else if (icontype && icontype == "website_generated") {
            return Sparkles
        } else if (icontype && icontype == "preference_update") {
            return Pencil
        } else if (icontype && icontype == "website_publish") {
            return Download
        }
        return Activity
    }

    const selectedFilterLabel =
        analyticsFilter === "week" ? "This Week"
            : analyticsFilter === "thisMonth" ? "This Month"
                : analyticsFilter === "lastMonth" ? "Last Month"
                    : analyticsFilter === "custom" ? "Custom Date"
                        : "This Year";


    function checkWebsiteStatus(status: any) {
        return status === "published" ? true : false
    }

    return (
        <>
            <Seo url={USER_DASHBOARD_ROUTE} />
            <Header loading={isLoading || webisLoading} />
            <div className="min-h-screen bg-white py-20 transition-colors duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
                                    Welcome back, <span className="text-transparent bg-clip-text text-gradient">{user?.firstName}!</span>👋
                                </h1>
                                <p className="text-primary2 ">Here's what's happening with your websites today.</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <TimerCount />
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {data?.stats?.map((stat: any, index: number) => {
                            const config = statsStaticConfig[index];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="relative group"
                                >
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
                                        <div className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <motion.div
                                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                                    transition={{ duration: 0.6 }}
                                                    className={`w-12 h-12 bg-linear-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                                                >
                                                    <config.icon className="w-6 h-6 text-white" />
                                                </motion.div>
                                                <Badge className="bg-badge-primary badge-text-primary">
                                                    {stat.change}
                                                </Badge>
                                            </div>
                                            <div className="text-3xl font-bold mb-1 text-black dark:text-white">{stat.value}</div>
                                            <div className="text-sm text-primary2 ">{stat.label}</div>
                                        </div>
                                        <div className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden h-full flex flex-col">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-linear-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">Recent Projects</h2>
                                            <p className="text-sm text-primary2 ">Your latest projects</p>
                                        </div>
                                        <a href="/websitetype">
                                        {/* <a href={PREFERENCE_ROUTE_NOID}> */}
                                            <Button shadowColor="var(--shadow-gray-2)" className="w-full sm:w-auto text-white border-0">
                                                <Plus className="w-4 h-4 mr-2" />
                                                New Project
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 space-y-6 flex-1">

                                    {recentWebsites?.map((website: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            whileHover={{ x: 5 }}
                                            className="bg-white rounded-xl shadow border p-4 md:p-6 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                                <div className={`w-full h-32 md:w-24 md:h-24 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                                                    {website.thumbnail && website.thumbnail !== "" ? (
                                                        <img src={`${baseurl}${website.thumbnail}`} alt={website.websiteName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Sparkles className="w-8 h-8 text-white/50" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center  justify-between mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-lg md:text-xl">{website.websiteName}</h3>
                                                            <p className="text-sm text-gray-500 capitalize">{website.category || website.industry}</p>
                                                            {website.appId && (
                                                                <p className="text-xs text-gray-400 mt-0.5">Project ID: <span className="font-mono">{website.appId}</span></p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{formatDate(website.createdAt)}</span></div>
                                                        <div className="flex items-center gap-1 text-primary truncate max-w-[300px]"><Globe className="w-4 h-4" /><span>{getSingleDesignStyleData(website.designStyle)} </span></div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4 gap-2 md:flex md:items-center md:gap-2">
                                                    <Badge variant={checkWebsiteStatus(website.status) ? "default" : "secondary"} className="uppercase">{checkWebsiteStatus(website.status) ? "Generated" : "Draft"}</Badge>

                                                    <Button size="sm" className="gradient-primary col-span-4" onClick={() => checkWebsiteStatus(website.status) ? window.open(baseurl + "/" + APIURL.PREVIEW_PATH + "/" + website._id, '_blank') : window.location.assign(`/webpreviewextra/${website._id}`)}> {/* extra */}
                                                        {checkWebsiteStatus(website.status) ? <> <Eye className="w-4 h-4 mr-1" /> Preview</> : <> <Edit className="w-4 h-4 mr-1" /> Edit</>}
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => website.zipUrl !== "" && window.open(`${baseurl}${website.zipUrl}`, '_blank')} disabled={!checkWebsiteStatus(website.status)}>
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40" onClick={() => handleDeleteProject(website)} disabled={isDeleting} title="Delete project">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <a href="/webhistory">
                                        <Button variant="outline" className="w-full mt-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                                            View All Projects
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="h-full"
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden h-full flex flex-col">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-linear-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
                                    <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">Recent Activity</h2>
                                    <p className="text-sm text-primary2 ">Latest updates</p>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        {data?.activities?.map((activity: any, index: number) => {
                                            const ActivityIcon = activityIcons(activity?.atypes);
                                            return (
                                                <motion.div
                                                    key={activity.id || index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.7 + index * 0.1 }}
                                                    className="flex gap-4"
                                                >
                                                    <div className="w-10 h-10 bg-linear-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-xl flex items-center justify-center shrink-0">
                                                        <ActivityIcon className="w-5 h-5 text-primary" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm mb-1 text-black dark:text-gray-200 truncate">
                                                            <span className="font-medium">{activity?.action}</span>{" "}
                                                            <span className="text-primary">{activity?.target}</span>
                                                        </p>

                                                        <div className="text-xs text-primary2 flex items-center gap-1">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {activity?.time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    {/* Heading */}
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">
                                            Project Analytics
                                        </h2>
                                        <p className="text-sm text-primary2 ">
                                            {selectedFilterLabel}
                                        </p>
                                    </div>

                                    {/* Filters container */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                                        {/* Custom Date Inputs */}
                                        {analyticsFilter === "custom" && (
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                                                <Input
                                                    type="date"
                                                    placeholder="Start Date"
                                                    value={customDates.start}
                                                    onChange={(e) => setCustomDates({ ...customDates, start: e.target.value })}
                                                    className="w-full sm:w-auto border rounded-md px-2 py-1 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                                />

                                                {/* End Date */}
                                                <Input
                                                    type="date"
                                                    placeholder="End Date"
                                                    value={customDates.end}
                                                    onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })}
                                                    className="w-full sm:w-auto border rounded-md px-2 py-1 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                                />
                                            </div>
                                        )}

                                        {/* Select Dropdown */}
                                        <Select
                                            value={analyticsFilter}
                                            onValueChange={(val) => {
                                                setAnalyticsFilter(val);
                                                if (val !== 'custom') setCustomDates({ start: "", end: "" });
                                            }}
                                        >
                                            <SelectTrigger className="w-full sm:w-[170px] dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <SelectValue placeholder="Filter" />
                                                </div>
                                            </SelectTrigger>

                                            <SelectContent className="z-[100]">
                                                <SelectItem value="week">This Week</SelectItem>
                                                <SelectItem value="thisMonth">This Month</SelectItem>
                                                <SelectItem value="lastMonth">Last Month</SelectItem>
                                                <SelectItem value="yearly">This Year</SelectItem>
                                                <SelectItem value="custom">Custom Date</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>


                            <div className="p-6">
                                <div className="flex items-end justify-between h-64 gap-2 sm:gap-4">
                                    {(() => {
                                        const maxValue = Math.max(
                                            ...(websiteAnalytics?.data?.map((item: any) => item?.total || 0) || [1])
                                        );

                                        return websiteAnalytics?.data?.map((item: any, index: number) => {
                                            const heightPercent = maxValue > 0 ? (item.total / maxValue) * 100 : 0;

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${heightPercent}%` }}
                                                    transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
                                                    className={`flex-1 bg-linear-to-t rounded-t-lg transition-all cursor-pointer relative group ${gradientClasses.chart} ${gradientClasses.chartHover}`}
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                        {item.total} Projects
                                                    </div>
                                                </motion.div>
                                            );
                                        });
                                    })()}


                                </div>

                                <div className="flex justify-between mt-4 text-xs text-gray-500 ">
                                    {websiteAnalytics?.data?.map((item: any, index: number) => (
                                        <span key={index} className={index % 2 !== 0 ? "hidden sm:inline" : ""}>
                                            {item.month}
                                        </span>
                                    ))}
                                </div>


                            </div>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">Quick Actions</h2>
                                <p className="text-sm text-primary2 ">Get started quickly</p>
                            </div>
                            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {quickActionsConfig.map((action, index) => (
                                    <motion.a
                                        key={index}
                                        href={action.link}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + index * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -6 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="group relative p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-800 
                 hover:shadow-lg transition-all 
                 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800
                 flex flex-col items-center justify-center text-center"
                                    >
                                        <div
                                            className={`w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br ${action.gradient}
                    rounded-xl flex items-center justify-center
                    mb-3 shadow-lg
                    group-hover:scale-110 transition-transform`}
                                        >
                                            <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>

                                        <span className="font-medium text-sm text-black dark:text-gray-200">
                                            {action.label}
                                        </span>

                                        <div
                                            className={`absolute inset-0 bg-linear-to-br ${action.gradient}
                    opacity-0 group-hover:opacity-5 rounded-xl
                    transition-opacity pointer-events-none`}
                                        />
                                    </motion.a>
                                ))}
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
