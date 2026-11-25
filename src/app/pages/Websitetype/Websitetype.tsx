import { createElement, useState, useMemo } from "react";
import { motion } from "motion/react";
import { Card, Header, Footer } from "../../../components/index";
import { useWebsitetype } from "../../../hooks/useWebsitetype";
import DynamicIcon from "../../../components/ui/icon";
import { ArrowRight, Bot, CalendarDays, CheckCircle2, CreditCard, FileText, Globe, Layers, LayoutDashboard, Loader2, MessageSquare, Search, ShoppingBag, Sparkles } from "lucide-react";
import Seo from "../../../components/seo/Seo";
import { WEBSITE_TYPE_ROUTE } from "../../../helper/routes";
import { Input } from "../../../components/ui/input";
import { getCardColor, normalizeCategory } from "../../../helper/function";
import { postPreference } from "../../../api/postapi";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ui/confirmmodal";

const BUILDER_SUBDOMAINS = ["ibuild", "ipro", "iflow", "imax"];

const getSubdomain = () => {
    const parts = window.location.hostname.split(".");
    if (parts.length <= 2) return "";
    const sub = parts[0].toLowerCase();
    if (sub === "www" || !BUILDER_SUBDOMAINS.includes(sub)) return "";
    return sub;
};

const MAIN_SUBDOMAINS = [((import.meta.env.VITE_MAIN_SUBDOMAIN as string) || "ibuild").toLowerCase()];

type WebsiteTypeItem = {
    _id: string;
    type: string;
    iconName: string;
    shortDescription: string;
    slug?: string;
    category?: { name?: string; description?: string };
    agents?: string[];
    connectors?: string[];
};

const DEFAULT_CATEGORY = "App Builder Agent";

function categoryIcon(name: string) {
    const value = name.toLowerCase();
    if (value.includes("app") || value.includes("builder")) return Layers;
    if (value.includes("plan") || value.includes("calendar")) return CalendarDays;
    if (value.includes("email") || value.includes("communication") || value.includes("social")) return MessageSquare;
    if (value.includes("file") || value.includes("document") || value.includes("notes") || value.includes("learning")) return FileText;
    if (value.includes("map") || value.includes("local") || value.includes("weather") || value.includes("travel")) return Globe;
    if (value.includes("food") || value.includes("grocery") || value.includes("shopping")) return ShoppingBag;
    if (value.includes("home") || value.includes("household")) return LayoutDashboard;
    if (value.includes("music") || value.includes("entertainment")) return Sparkles;
    if (value.includes("health") || value.includes("fitness")) return CheckCircle2;
    if (value.includes("finance") || value.includes("admin")) return CreditCard;
    return Bot;
}

function displayCategoryName(name: string): string {
    if (name === DEFAULT_CATEGORY) return "AI Apps and Tools";
    return name.replace(/\s+Agent$/, "");
}

export function WebsiteTypePage() {
    const { data } = useWebsitetype();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
    const [creatingId, setCreatingId] = useState<string | null>(null);
    const [confirmItem, setConfirmItem] = useState<WebsiteTypeItem | null>(null);
    const subdomain = useMemo(() => getSubdomain(), []);

    const handleConfirm = async () => {
        if (!confirmItem) return;
        const item = confirmItem;
        setConfirmItem(null);
        setCreatingId(item._id);
        try {
            const res = await postPreference({
                categoryId: item._id,
                websiteName: item.type,
                nodeVersion: "20",
            });
            if (res?.success) {
                const preferenceId = res?.data?.preferenceId;
                window.location.href = `/webpreviewextra/${preferenceId}`;
            } else {
                toast.error(res?.message || "Failed to create project");
                setCreatingId(null);
            }
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Failed to create project");
            setCreatingId(null);
        }
    };

    const handleSelect = (item: WebsiteTypeItem) => {
        if (creatingId) return;
        setConfirmItem(item);
    };

    const websitetypedata = useMemo(() => {
        const query = normalizeCategory(searchQuery);
        const typedData = data as WebsiteTypeItem[] | undefined;
        const hasSlugs = typedData?.some((item) => normalizeCategory(item.slug) !== "") ?? false;
        return typedData?.filter((item) => {
            const type = normalizeCategory(item.type);
            const desc = normalizeCategory(item.shortDescription);
            const category = normalizeCategory(item.category?.name);
            const agents = normalizeCategory(Array.isArray(item.agents) ? item.agents.join(" ") : "");
            const connectors = normalizeCategory(Array.isArray(item.connectors) ? item.connectors.join(" ") : "");

            if (!type.includes(query) && !desc.includes(query) && !category.includes(query) && !agents.includes(query) && !connectors.includes(query)) return false;

            if (subdomain && !MAIN_SUBDOMAINS.includes(subdomain) && hasSlugs) {
                const slug = normalizeCategory(item.slug);
                if (!slug.includes(subdomain)) return false;
            }

            return true;
        });
    }, [data, searchQuery, subdomain]);

    const groupedWebsitetypes = useMemo(() => {
        const groups = new Map<string, WebsiteTypeItem[]>();
        for (const item of websitetypedata || []) {
            const name = item.category?.name || "Other";
            if (!groups.has(name)) groups.set(name, []);
            groups.get(name)!.push(item);
        }
        return Array.from(groups, ([name, items]) => ({ name, items, description: items[0]?.category?.description || "" }));
    }, [websitetypedata]);

    const resolvedCategory = groupedWebsitetypes.some((group) => group.name === activeCategory)
        ? activeCategory
        : groupedWebsitetypes.some((group) => group.name === DEFAULT_CATEGORY)
            ? DEFAULT_CATEGORY
            : groupedWebsitetypes[0]?.name ?? "";
    const visibleGroups = groupedWebsitetypes.filter((group) => group.name === resolvedCategory);

    return (
        <div className="min-h-screen">
            <Seo url={WEBSITE_TYPE_ROUTE} />
            <Header />
            <div className="py-30">
                <div className="container mx-auto px-4 max-w-6xl">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                            Which AI service do you need?
                        </h1>
                        <p className="text-xl text-primary2">
                            Pick a service, describe your task in plain English, and AI will prepare the rest.
                        </p>
                    </motion.div>
                    <div className="max-w-xl mx-auto px-4 mb-12">
                        <div className="relative mt-8">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-400" />
                            <Input
                                placeholder={"Search AI services..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery?.(e.target.value)}
                                className="pl-12 h-12 text-black"
                            />
                        </div>
                    </div>
                    <div className="agi-tabs" role="group" aria-label="AI service categories">
                        {groupedWebsitetypes.map((group) => (
                            <button
                                key={group.name}
                                type="button"
                                aria-pressed={group.name === resolvedCategory}
                                onClick={() => setActiveCategory(group.name)}
                                className="agi-tab"
                            >
                                {createElement(categoryIcon(group.name), { className: "h-4 w-4" })}
                                {displayCategoryName(group.name)}
                                <span className="agi-tab-count">{group.items.length}</span>
                            </button>
                        ))}
                    </div>
                    {visibleGroups.map((group, groupIndex) => (
                        <section key={group.name} className="mb-12">
                            <div className="mb-5">
                                <h2 className="text-2xl font-bold text-black">{displayCategoryName(group.name)}</h2>
                                {group.description && <p className="text-primary2 mt-1">{group.description}</p>}
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.items.map((item, itemIndex) => {
                                    const colorClass = getCardColor(item.type);
                                    const isCreating = creatingId === item._id;

                                    return (
                                        <motion.div
                                            key={item._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: (groupIndex * 3 + itemIndex) * 0.05 }}
                                        >
                                            <Card
                                                className={`p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-800 flex flex-col h-full ${isCreating ? "opacity-60 pointer-events-none" : ""}`}
                                                onClick={() => handleSelect(item)}
                                            >
                                                <div className={`w-16 h-16 bg-linear-to-br ${colorClass} rounded-xl flex items-center justify-center mb-4 transition-colors duration-300`}>
                                                    {isCreating ? (
                                                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                                                    ) : (
                                                        <DynamicIcon name={item.iconName} className="text-white" />
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-xl mb-2 text-black">{item.type}</h3>
                                                <p className="text-primary2 mb-4">{item.shortDescription}</p>
                                                <div className="mt-auto flex items-center text-primary font-medium gap-2 transition-colors duration-300">
                                                    {isCreating ? (
                                                        <span>Creating...</span>
                                                    ) : (
                                                        <>
                                                            <span>Select</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                        </>
                                                    )}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
            <Footer />
            <ConfirmModal
                open={!!confirmItem}
                title={`Start ${confirmItem?.type}?`}
                description="AI will create a new service workspace and open it for you to review."
                confirmLabel="Start service"
                onClose={() => setConfirmItem(null)}
                onConfirm={handleConfirm}
            />
        </div>
    );
}
