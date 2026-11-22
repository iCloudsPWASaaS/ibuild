import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, Eye, Download, Edit, Plus, Globe, Search, CheckCircleIcon, Trash2 } from "lucide-react";
import { Button, Input, Badge, Footer, Header } from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import { WEBSITE_HISTORY_ROUTE } from "../../../helper/routes";
import { useWebhistorydata, useDeleteProject } from "../../../hooks/useWebhistory";
import { APIURL } from "../../../api/apiurl";
import DynamicIcon from "../../../components/ui/icon";
import { formatDate, getSingleDesignStyleData } from "../../../helper/function";
import { useNavigate } from "react-router-dom";


export function WebsiteHistoryPage() {
    const { data, isLoading, refetch } = useWebhistorydata();
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
    const [view, setView] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const baseurl = APIURL.BASE_URL;
    const navigate = useNavigate();

    const websites = data?.data || [];

    const handleDeleteProject = (website: any) => {
        if (!window.confirm(`Delete "${website.websiteName}"? This cannot be undone.`)) return;
        deleteProject(website._id, {
            onError: () => window.alert("Failed to delete project. Please try again."),
        });
    };

    const gradients = [
        "from-blue-500 to-blue-600",
        "from-purple-500 to-purple-600",
        "from-pink-500 to-pink-600",
        "from-orange-500 to-orange-600",
        "from-green-500 to-green-600",
        "from-indigo-500 to-indigo-600"
    ];

    // 🔥 route change pe data refresh
    useEffect(() => {
        refetch();
    }, [navigate]);

    const filteredWebsites = websites.filter((website: any) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            website.websiteName.toLowerCase().includes(query) ||
            (website.category?.toLowerCase().includes(query) ?? false) ||
            (website.industry?.toLowerCase().includes(query) ?? false)
        );
    });
    function checkWebsiteStatus(status: any) {
        return status === "published" ? true : false
    }
    return (
        <div className="min-h-screen bg-white transition-colors duration-300">
            <Seo url={WEBSITE_HISTORY_ROUTE} />
            <Header isWhite={true} loading={isLoading} />

            <section className="pt-24 md:pt-35 pb-12 md:pb-20 banner-gradient text-white">
                <div className="container px-4 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">My Websites</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data?.stats.map((stat: any, index: number) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <DynamicIcon name={stat.icon} className="w-4 h-4" />
                                        <span className="text-xs opacity-90">{stat.label}</span>
                                    </div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-4 md:py-6 bg-white border-b sticky top-[60px] md:top-[73px] z-40">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary2" />
                                <Input
                                    placeholder="Search websites..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-3">
                            <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg">
                                <button onClick={() => setView("grid")} className={`px-3 py-1.5 rounded text-sm ${view === "grid" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>Grid</button>
                                <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded text-sm ${view === "list" ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}>List</button>
                            </div>
                            <Button className="gradient-primary" path="/Websitetype">
                                <Plus className="w-4 h-4 mr-2" /> New Website
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-12 mb-12">
                <div className="container px-4 mx-auto max-w-7xl">

                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">Loading history...</div>
                    ) : filteredWebsites?.length > 0 ? (
                        view === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredWebsites.map((website: any, index: number) => (
                                    <motion.div key={website._id} className="group bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all flex flex-col h-full">
                                        <div className={`aspect-video relative  flex items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                                            {website.thumbnail && website.thumbnail !== "" ? (
                                                <img
                                                    src={`${baseurl}${website.thumbnail}`}
                                                    alt={website.websiteName}
                                                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <Sparkles className="w-16 h-16 text-white/50 relative z-10" />
                                            )}
                                           
                                        </div>

                                        <div className="p-6 p-6 flex flex-col flex-1 bg-secondary-light">
                                            <div className="mt-auto items-center gap-2">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="truncate pr-2">
                                                        <h3 className="font-bold text-xl mb-2 text-black truncate">{website.websiteName}</h3>
                                                        {website.appId && (
                                                            <p className="text-xs text-gray-400 mb-1">Project ID: <span className="font-mono">{website.appId}</span></p>
                                                        )}
                                                        <div className="flex items-center gap-4 text-sm text-primary2">
                                                        <div className="flex items-center gap-1"><CheckCircleIcon className="w-4 h-4" /> <p className="text-sm text-primary2 capitalize">{website.category || website.industry}</p></div>
                                                       <div className="flex items-center gap-1"><Globe className="w-4 h-4" /><span className="capitalize">{getSingleDesignStyleData(website.designStyle)}</span></div> 
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-primary2 mb-4 justify-between">
                                                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{formatDate(website.createdAt)}</span></div>
                                                    <div className="flex items-center gap-1"> 
                                                    <Badge variant={checkWebsiteStatus(website.status) ? "default" : "secondary"} className={checkWebsiteStatus(website.status) ? "bg-blue-soft" : "uppercase"}>
                                                    {checkWebsiteStatus(website.status) ? "Generated" : "Draft"}
                                                </Badge>
                                                </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" className="flex-1 gradient-primary" onClick={() => checkWebsiteStatus(website.status) ? window.open(baseurl + "/" + APIURL.PREVIEW_PATH + "/" + website._id, '_blank') : window.location.assign(`/webpreviewextra/${website._id}`)}> {/* extra */}
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
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredWebsites.map((website: any, index: number) => (
                                    <motion.div key={website._id} className="bg-white rounded-xl shadow border p-4 md:p-6 hover:shadow-lg transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                            <div className={`w-full h-32 md:w-24 md:h-24 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                                                {website.thumbnail && website.thumbnail !== "" ? (
                                                    <img src={`${baseurl}${website.thumbnail}`} alt={website.websiteName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Sparkles className="w-8 h-8 text-white/50" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
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
                                                    <div className="flex items-center gap-1"><Globe className="w-4 h-4" /><span className="capitalize">{getSingleDesignStyleData(website.designStyle)}</span></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 gap-2 md:flex md:items-center md:gap-2">
                                                <Badge variant={checkWebsiteStatus(website.status) ? "default" : "secondary"} className="uppercase">{checkWebsiteStatus(website.status) ? "Generated" : "Draft"}</Badge>
                                                <Button size="sm" className="gradient-primary col-span-4" onClick={() => checkWebsiteStatus(website.status) ? window.open(baseurl + "/" + APIURL.PREVIEW_PATH + "/" + website._id, '_blank') : navigate(`/webpreviewextra/${website._id}`)}>
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
                            </div>
                        )
                    ) : (
                        <div className="px-6 py-12 text-center text-muted-foreground">
                            <div className="flex justify-center mb-4">
                                <Search className="w-12 h-12 opacity-20" />
                            </div>
                            <p className="text-lg font-medium">No history found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}