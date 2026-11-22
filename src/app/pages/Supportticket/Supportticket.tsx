import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Plus, Search, MessageCircle, Clock, AlertCircle,ChevronLeft, ChevronRight,
    XCircle, Eye, Send, X, User as UserIcon, Shield, Paperclip, FileText
} from "lucide-react";
import { Button, Input, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Footer, Header, Textarea } from "../../../components/index";
import { useSupportticket } from "../../../hooks/useSupportticket";
import DynamicIcon from "../../../components/ui/icon";
import { useTicket } from "../../../hooks/useTicket";
import { useTicketReply } from "../../../hooks/useTicketReply";
import { APIURL } from "../../../api/apiurl";
import Seo from "../../../components/seo/Seo";
import { SUPPORT_TICKETS_ROUTE } from "../../../helper/routes";
import { useNavigate } from "react-router-dom";

export default function SupportTicketsPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortField] = useState("createdAt");
    const [sortOrder] = useState("desc");
    const baseurl = APIURL.BASE_URL;
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const { data, isLoading, refetch} = useSupportticket({
        page,
        limit,
        search: debouncedSearch,
        sortField,
        sortOrder,
        status: statusFilter !== "all" ? statusFilter : ""
    });

        // 🔥 route change pe data refresh
    useEffect(() => {
        refetch();
    }, [navigate]);

    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const ticketdata = useTicket(selectedTicket?.id || selectedTicket?._id);
    const { mutate } = useTicketReply();

    const [replyText, setReplyText] = useState("");
    const [attachment, setAttachment] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    


    const statColors = [
        "bg-blue-500/20",
        "bg-yellow-500/20",
        "bg-green-500/20",
        "bg-gray-500/20"
    ];

    const getStatusIcon = (status: any) => {
        switch (status) {
            case "Open": return <AlertCircle className="w-4 h-4" />;
            case "Answered": return <Clock className="w-4 h-4" />;
            case "Closed": return <XCircle className="w-4 h-4" />;
            default: return <MessageCircle className="w-4 h-4" />;
        }
    };

    const getPriorityColor = (priority: any) => {
        switch (priority) {
            case "High": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
            case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
            case "Low": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
            default: return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
        }
    };

    const handleViewTicket = (ticket: any) => {
        setSelectedTicket(ticket);
    };

    const handleCloseModal = () => {
        setSelectedTicket(null);
        setReplyText("");
        setAttachment(null);
    };

    const handleFileSelect = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
        }
    };

    const removeAttachment = () => {
        setAttachment(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handlesendreply = () => {
        if (!replyText && !attachment) return;

     
        const ticketId = ticketdata?.data?.id || selectedTicket?.id || selectedTicket?._id;
        
        const formData = new FormData();
        formData.append("ticketId", ticketId);
        formData.append("message", replyText);
        
        if (attachment) {
            formData.append("attachments", attachment); 
        }

        mutate(  {
            ticketId: ticketId,
            formData: formData,
        }, {
            onSuccess: () => {
                ticketdata.refetch();
            }
        });
        setReplyText("");
        removeAttachment();
    };

    const totalPages = Number(data?.pagination?.totalPages) || 1;
    const currentTicket = ticketdata?.data || selectedTicket;

    return (
        <div className="min-h-screen relative">
            <Seo url={SUPPORT_TICKETS_ROUTE} />
            <Header isWhite={true} />

            <section className="pt-30 pb-20 banner-gradient text-white">
                <div className="container px-4 mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Tickets</h1>
                        <p className="text-xl opacity-90 mb-8">Track and manage your support requests</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data?.stats?.map((stat: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                    className={`${statColors[index]} backdrop-blur-sm rounded-xl p-4 border border-white/20`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <DynamicIcon name={stat?.icon} className="w-5 h-5" />
                                        <span className="text-sm ">{stat?.label}</span>
                                    </div>
                                    <div className="text-3xl font-bold">{stat?.value}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-6 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800  top-18.25 z-40">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search tickets..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                          setPage(1);
                                    }}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={(val) =>{
                                 setStatusFilter(val);
                                  setPage(1);
                                 }}>
                                <SelectTrigger className="w-[160px] bg-white dark:bg-zinc-900">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="z-[100]">
                                    <SelectItem value="all">All Ticket</SelectItem>
                                    <SelectItem value="Open">Open Ticket</SelectItem>
                                    <SelectItem value="Answered">Answered Ticket</SelectItem>
                                    <SelectItem value="Closed">Closed Ticket</SelectItem>
                                </SelectContent>
                            </Select>

                           <Select value={limit.toString()} onValueChange={(val) => { setLimit(Number(val)); setPage(1); }}>
                                <SelectTrigger className="w-[130px] dark:bg-zinc-900 dark:border-zinc-800">
                                    <SelectValue placeholder="Limit" />
                                </SelectTrigger>
                                <SelectContent className="z-[100]">
                                    <SelectItem value="5">5 Per Page</SelectItem>
                                    <SelectItem value="10">10 Per Page</SelectItem>
                                    <SelectItem value="20">20 Per Page</SelectItem>
                                    <SelectItem value="50">50 Per Page</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button path="/addtickets" className="gradient-primary text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            New Ticket
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-12 dark:bg-zinc-950">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="text-center py-12 text-muted-foreground">Loading tickets...</div>
                        ) : data?.tickets?.length > 0 ? (
                            data?.tickets?.map((ticket: any, index: number) => (
                                <motion.div
                                    key={ticket.id || ticket._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleViewTicket(ticket)}
                                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border dark:border-zinc-800 p-6 hover:shadow-xl transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-sm font-mono text-muted-foreground">{ticket?.id}</span>
                                                <Badge variant={ticket?.status === "Open" ? "filled" : ticket?.status === "Answered" ? "secondary" : "outline"}>
                                                    <div className="flex items-center gap-1">
                                                        {getStatusIcon(ticket?.status)}
                                                        {ticket?.status}
                                                    </div>
                                                </Badge>
                                                <Badge variant="outline" className={`${getPriorityColor(ticket.priority)} border`}>
                                                    {ticket?.priority}
                                                </Badge>
                                            </div>

                                            <h3 className="font-bold text-xl mb-3 dark:text-white transition-colors">
                                                {ticket?.subject}
                                            </h3>

                                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>Created {ticket?.created}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle className="w-4 h-4" />
                                                    <span>{ticket?.replies || 0} replies</span>
                                                </div>
                                                <span>Updated {ticket?.updated}</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="hover-primary text-foreground transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewTicket(ticket);
                                            }}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="px-6 py-12 text-center text-muted-foreground">
                                <div className="flex justify-center mb-4">
                                    <Search className="w-12 h-12 opacity-20" />
                                </div>
                                <p className="text-lg font-medium">No tickets found</p>
                                <p className="text-sm">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
{totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8 pb-10">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                            </Button>

                            {/* Numbered Buttons */}
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
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            >
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            <AnimatePresence>
                {selectedTicket && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-zinc-950 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh] border dark:border-zinc-800"
                        >
                            <div className="p-6 border-b dark:border-zinc-800 flex items-start justify-between bg-white dark:bg-zinc-900 sticky top-0 z-20">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-sm text-muted-foreground">{currentTicket?.id}</span>
                                        <Badge variant="outline" className={`${getPriorityColor(currentTicket?.priority)} border`}>
                                            {currentTicket?.priority}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {currentTicket?.created}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold dark:text-white pr-8">{currentTicket?.subject}</h2>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-zinc-950/50">
                                {ticketdata.isLoading ? (
                                    <div className="flex justify-center p-8">Loading messages...</div>
                                ) : (
                                    currentTicket?.history?.map((msg: any, i: number) => (
                                        <div
                                            key={i}
                                            className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                        >
                                            <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                                        ${msg.role === 'user' ? 'gradient-primary hover-primary text-white' : 'bg-white hover-primary dark:bg-zinc-800 border dark:border-zinc-700'}
                                    `}>
                                                {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Shield className="w-5 h-5 text-primary" />}
                                            </div>

                                            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                                <div className="flex items-center gap-2 mb-1 px-1">
                                                    <span className="text-sm font-semibold dark:text-zinc-200">{msg?.name}</span>
                                                    <span className="text-xs text-muted-foreground">{msg?.timestamp}</span>
                                                </div>
                                                <div className={`
                                            p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                                            ${msg?.role === 'user'
                                                        ? 'bg-primary text-white rounded-tr-none'
                                                        : 'bg-white dark:bg-zinc-900 border dark:border-zinc-800 dark:text-zinc-300 rounded-tl-none'}
                                        `}>
                                                    <div className="whitespace-pre-wrap">{msg?.message}</div>

                                                    {msg.attachments && msg.attachments.length > 0 && (
                                                        <div className={`mt-3 flex flex-wrap gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                            {msg.attachments.map((url: string, idx: number) => {
                                                                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
                                                                return (
                                                                    <a
                                                                        key={idx}
                                                                        href={baseurl + url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="relative group block rounded-lg overflow-hidden border dark:border-zinc-700 bg-black/5 dark:bg-white/5"
                                                                    >
                                                                        {isImage ? (
                                                                            <img src={baseurl + url} alt="attachment" className="w-20 h-20 object-cover" />
                                                                        ) : (
                                                                            <div className="w-20 h-20 flex flex-col items-center justify-center p-2">
                                                                                <FileText className={`w-6 h-6 mb-1 ${msg.role === 'user' ? 'text-white/70' : 'text-primary'}`} />
                                                                                <span className="text-[10px] truncate w-full text-center">File</span>
                                                                            </div>
                                                                        )}
                                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                            <Eye className="w-4 h-4 text-white" />
                                                                        </div>
                                                                    </a>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800">
                                {currentTicket?.status === "Closed" ? (
                                    <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/30">
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                            <XCircle className="w-5 h-5" />
                                            <span className="font-medium text-sm">This ticket is closed. You can no longer reply to it.</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileSelect}
                                        />

                                        <AnimatePresence>
                                            {attachment && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="mb-3"
                                                >
                                                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 border dark:border-zinc-700 p-2 pl-3 pr-2 rounded-lg w-fit max-w-full">
                                                        <div className="p-1.5 bg-white dark:bg-zinc-900 rounded-md border dark:border-zinc-700">
                                                            <FileText className="w-4 h-4 text-primary" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-medium truncate max-w-[200px] dark:text-zinc-200">
                                                                {attachment?.name}
                                                            </span>
                                                            <span className="text-[10px] text-muted-foreground">
                                                                {(attachment?.size / 1024).toFixed(1)} KB
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={removeAttachment}
                                                            className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
                                                        >
                                                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="relative">
                                            <Textarea
                                                placeholder="Type your reply here..."
                                                className="min-h-[100px] pr-4 pb-12 resize-none bg-gray-50 dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 focus-visible:ring-primary"
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                            />
                                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    title="Attach a file"
                                                >
                                                    <Paperclip className="w-4 h-4" />
                                                </button>

                                                <Button
                                                    size="sm"
                                                    className="gradient-primary text-white shadow-lg hover:shadow-primary/20"
                                                    onClick={handlesendreply}
                                                    disabled={!replyText && !attachment}
                                                >
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Send Reply
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}