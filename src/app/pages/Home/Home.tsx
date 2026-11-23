import { createElement, type ReactNode, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Bot,
    CalendarDays,
    Check,
    CheckCircle2,
    CreditCard,
    Download,
    FileText,
    Globe,
    Layers,
    LayoutDashboard,
    LayoutGrid,
    Lock,
    MessageSquare,
    Plug,
    Rocket,
    Search,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Workflow,
    X,
    type LucideIcon,
} from "lucide-react";
import {
    BlogGrid,
    Button,
    FAQSection,
    Footer,
    Header,
    PricingSection,
    SectionButton,
} from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import DynamicIcon from "../../../components/ui/icon";
import { useBlogs } from "../../../hooks/useBlog";
import { useWebsitetype } from "../../../hooks/useWebsitetype";
import { CONTACT_US_ROUTE, HOME_ROUTE, WEBSITE_TYPE_ROUTE } from "../../../helper/routes";
import PropertyPage from "./property";
import IflowPage from "./iflow";
import ImaxPage from "./imax";

type RevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

type Feature = {
    icon: LucideIcon;
    title: string;
    description: string;
    tone: string;
};

type UseCase = {
    icon: LucideIcon;
    title: string;
    description: string;
};

type WebsiteTypeItem = {
    _id: string;
    type: string;
    iconName?: string;
    shortDescription?: string;
    category?: { name?: string; description?: string };
    agents?: string[];
    connectors?: string[];
};

type CategoryGroup = {
    name: string;
    description: string;
    items: WebsiteTypeItem[];
};

function iconForCategory(name: string): LucideIcon {
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
    if (name === "App Builder Agent") return "AI Apps and Tools";
    return name.replace(/\s+Agent$/, "");
}

function getSubdomain(): string | null {
    const hostname = window.location.hostname;

    if (hostname.includes("localhost")) {
        const parts = hostname.split(".");
        return parts.length > 1 ? parts[0] : null;
    }

    const parts = hostname.split(".");
    return parts.length > 2 ? parts[0] : null;
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const heroProof: { value: string; label: string; icon: LucideIcon }[] = [
    { value: "14", label: "types of AI services", icon: Layers },
    { value: "56", label: "AI helpers ready", icon: Bot },
    { value: "Plain English", label: "no tech setup", icon: MessageSquare },
    { value: "You decide", label: "before AI acts", icon: ShieldCheck },
];

const features: Feature[] = [
    {
        icon: Layers,
        title: "Pick what you need",
        description: "Choose a service from everyday jobs like bookings, reminders, research and admin.",
        tone: "bg-blue-50 text-blue-600",
    },
    {
        icon: Bot,
        title: "AI picks the right help",
        description: "The right AI helpers are selected for your task, so you do not have to manage them one by one.",
        tone: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: Workflow,
        title: "A clear plan first",
        description: "See the steps AI will take before anything runs. Simple, visible and easy to change.",
        tone: "bg-violet-50 text-violet-600",
    },
    {
        icon: Plug,
        title: "Works with your tools",
        description: "Connect calendars, maps, email and payments only when your service needs them.",
        tone: "bg-amber-50 text-amber-600",
    },
    {
        icon: ShieldCheck,
        title: "You stay in charge",
        description: "AI asks before it sends, buys, books or changes anything important.",
        tone: "bg-rose-50 text-rose-600",
    },
    {
        icon: Rocket,
        title: "Improve as you go",
        description: "Tell AI what to change in plain English and your service gets better over time.",
        tone: "bg-sky-50 text-sky-600",
    },
];

const workflowSteps = [
    {
        title: "Pick a service",
        description: "Start with what you want help with — bookings, admin, research, notes or something else.",
    },
    {
        title: "Say what you need",
        description: "Write it in plain English. AI chooses the helpers, tools and steps for the job.",
    },
    {
        title: "Review and run",
        description: "Check the simple plan, approve important actions and let AI do the work.",
    },
];

const useCases: UseCase[] = [
    { icon: CalendarDays, title: "Booking & scheduling", description: "Handle enquiries, appointments and reminders without the back and forth." },
    { icon: MessageSquare, title: "Messages & email", description: "Draft replies, sort inbox items and keep conversations moving." },
    { icon: FileText, title: "Notes & documents", description: "Find, summarise and tidy up the information you already have." },
    { icon: Globe, title: "Travel & local plans", description: "Compare places, plan routes and make plans around the weather." },
    { icon: CreditCard, title: "Money & admin", description: "Track receipts, invoices and subscriptions before anything is paid." },
    { icon: Bot, title: "Everyday help", description: "Practical help for home, family, health routines and small tasks." },
];

function Hero() {
    const scrollToWorkflow = () => {
        document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="relative overflow-hidden border-b border-border/70 bg-background pb-20 pt-24 md:pb-24 md:pt-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />
                <div
                    className="absolute inset-x-0 top-0 h-80 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <div className="container mx-auto max-w-5xl px-4 text-center">
                <Reveal delay={0.06}>
                    <h1 className="agi-display mt-7 text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl">
                        Tell AI what you need.{" "}
                        <span className="agi-accent-text">We&apos;ll get it done.</span>
                    </h1>
                </Reveal>
                <Reveal delay={0.12}>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Choose a service, describe your task in plain English, and IClouds AI puts the right helpers,
                        steps and reminders in place. No technical setup.
                    </p>
                </Reveal>
                <Reveal delay={0.18}>
                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button path={WEBSITE_TYPE_ROUTE} size="lg" arrow={true} className="h-12 px-7 text-base">
                            Choose an AI service
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={scrollToWorkflow}
                            className="h-12 px-7 text-base"
                        >
                            See how it works
                        </Button>
                        <SectionButton
                            href="https://drive.google.com/file/d/1TSjKYuTNWRa8ojdhVzPioQVPbJ05B9JF/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            size="lg"
                            className="h-12 px-7 text-base"
                        >
                            <Download className="h-4 w-4" />
                            Download IClouds AI Builder
                        </SectionButton>
                    </div>
                </Reveal>
                <Reveal delay={0.24}>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            No setup calls
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            Nothing runs without your approval
                        </span>
                    </div>
                </Reveal>
                <Reveal delay={0.3}>
                    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 border-t border-border pt-8 sm:gap-4 lg:grid-cols-4">
                        {heroProof.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className="group rounded-2xl border border-transparent px-3 py-4 transition duration-300 hover:border-border hover:bg-card hover:shadow-sm"
                                >
                                    <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <p className="mt-3 text-xl font-bold text-foreground sm:text-2xl">{item.value}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function PlatformSection() {
    return (
        <section id="platform" className="py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="max-w-2xl">
                    <Reveal delay={0.06}>
                        <h2 className="agi-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            AI help for the work you <span className="agi-accent-text">already do.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                            IClouds AI turns a plain-English request into a clear plan, picks the right helpers and connects
                            only the tools you need.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Reveal key={feature.title} delay={index * 0.05}>
                                <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tone}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-6 text-lg font-bold text-foreground">{feature.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                                    <div className="mt-7 h-px w-full bg-gradient-to-r from-primary/40 to-transparent opacity-60 transition group-hover:opacity-100" />
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function WorkflowSection() {
    return (
        <section id="workflow" className="relative overflow-hidden border-y border-border bg-muted/20 py-24">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <Reveal delay={0.06}>
                            <h2 className="agi-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Three simple steps.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                                No setup calls and no technical words. Pick a service, explain it like you would to a person,
                                and review the plan before it runs.
                            </p>
                        </Reveal>

                        <div className="mt-10 space-y-6">
                            {workflowSteps.map((step, index) => (
                                <Reveal key={step.title} delay={0.12 + index * 0.08}>
                                    <div className="flex gap-5">
                                        <div className="flex flex-col items-center">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-card text-sm font-bold text-primary shadow-sm">
                                                {index + 1}
                                            </span>
                                            {index < workflowSteps.length - 1 && (
                                                <span className="mt-2 h-12 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                                            )}
                                        </div>
                                        <div className="pb-2">
                                            <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <Reveal delay={0.2}>
                        <div className="rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-7">
                            <div className="flex items-center gap-2 border-b border-border pb-4">
                                <Sparkles className="h-4 w-4 text-emerald-600" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">AI setup</span>
                            </div>
                            <div className="mt-6 space-y-3 text-sm leading-relaxed">
                                <p className="text-muted-foreground">Reading your request…</p>
                                <p className="font-semibold text-emerald-600">✓ Booking helper selected</p>
                                <p className="text-muted-foreground">Preparing steps and reminders…</p>
                                <p className="font-semibold text-emerald-600">✓ Simple plan created for you</p>
                            </div>
                            <div className="mt-7 rounded-2xl border border-border bg-muted/50 p-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                        <Check className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Ready for you to review</p>
                                        <p className="text-xs text-muted-foreground">Nothing important happens without your OK.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function UseCasesSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <Reveal delay={0.06}>
                            <h2 className="agi-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Everyday jobs AI can <span className="agi-accent-text">handle.</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.12}>
                        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                            Pick one of these services or search the full list. Each one turns a normal request into a clear,
                            manageable plan.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {useCases.map((useCase, index) => {
                        const Icon = useCase.icon;
                        return (
                            <Reveal key={useCase.title} delay={index * 0.04}>
                                <div className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-lg">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-foreground">{useCase.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{useCase.description}</p>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal delay={0.2}>
                    <div className="mt-12 text-center">
                        <Button path={WEBSITE_TYPE_ROUTE} variant="outline" size="lg" arrow={true} className="h-12 px-7">
                            Explore all AI services
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

function ConfidenceStrip() {
    const items = [
        { icon: ShieldCheck, title: "Clear and safe", description: "You see what AI plans to do before it does it." },
        { icon: Lock, title: "Your approval matters", description: "Messages, bookings and payments wait for your go-ahead." },
        { icon: MessageSquare, title: "Plain English only", description: "Ask for changes the same way you would talk to a colleague." },
    ];

    return (
        <section className="pb-8">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid gap-4 rounded-3xl border border-border bg-muted/20 p-5 md:grid-cols-3 md:p-7">
                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Reveal key={item.title} delay={index * 0.06}>
                                <div className="flex h-full gap-4 rounded-2xl bg-card p-5 shadow-sm">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const DEFAULT_CATEGORY = "App Builder Agent";

function BusinessTypesSection({ items }: { items: WebsiteTypeItem[] }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);

    const groups = useMemo<CategoryGroup[]>(() => {
        const grouped = new Map<string, WebsiteTypeItem[]>();
        for (const item of items) {
            const name = item.category?.name?.trim() || "Other";
            const existing = grouped.get(name);
            if (existing) {
                existing.push(item);
            } else {
                grouped.set(name, [item]);
            }
        }

        const search = query.trim().toLowerCase();
        return Array.from(grouped, ([name, categoryItems]) => {
            const matching = !search
                ? categoryItems
                : name.toLowerCase().includes(search)
                  ? categoryItems
                  : categoryItems.filter((item) =>
                        `${item.type} ${item.shortDescription || ""} ${(item.agents || []).join(" ")} ${(item.connectors || []).join(" ")}`
                            .toLowerCase()
                            .includes(search),
                    );
            return {
                name,
                description: categoryItems[0]?.category?.description || "",
                items: matching,
            };
        })
            .filter((group) => group.items.length > 0)
            .sort((a, b) => {
                if (a.name === "App Builder Agent") return -1;
                if (b.name === "App Builder Agent") return 1;
                return a.name.localeCompare(b.name);
            });
    }, [items, query]);

    const resolvedCategory = groups.some((group) => group.name === activeCategory)
        ? activeCategory
        : groups.some((group) => group.name === DEFAULT_CATEGORY)
            ? DEFAULT_CATEGORY
            : groups[0]?.name ?? "";
    const activeGroup = groups.find((group) => group.name === resolvedCategory);
    const visibleItems = activeGroup ? activeGroup.items : [];
    const clearFilters = () => {
        setQuery("");
        setActiveCategory(DEFAULT_CATEGORY);
    };

    return (
        <section id="business-types" className="agi-services-section border-y border-border py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <Reveal delay={0.06}>
                            <h2 className="agi-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Find the right AI help for <span className="agi-accent-text">every task.</span>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={0.12}>
                        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                            Explore {items.length} ready-to-use AI services grouped by what you need done. Search, compare, and choose the right helper in seconds.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.16}>
                    <div className="agi-tabs mt-12" role="group" aria-label="AI service categories">
                        {groups.map((group) => {
                            const isActive = group.name === resolvedCategory;
                            return (
                                <button
                                    key={group.name}
                                    type="button"

                                    aria-pressed={isActive}
                                    onClick={() => setActiveCategory(group.name)}
                                    className="agi-tab"
                                >
                                    {createElement(iconForCategory(group.name), { className: "h-4 w-4" })}
                                    {displayCategoryName(group.name)}
                                    <span className="agi-tab-count">{group.items.length}</span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    {activeGroup ? (
                                        createElement(iconForCategory(activeGroup.name), { className: "h-5 w-5" })
                                    ) : (
                                        <LayoutGrid className="h-5 w-5" />
                                    )}
                                </span>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">
                                        {activeGroup ? displayCategoryName(activeGroup.name) : "AI services"}
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                        {activeGroup?.description || "Ready-to-use AI help for every kind of everyday task."}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-80">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search AI services"
                                        aria-label="Search AI services"
                                        className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                    {query && (
                                        <button
                                            type="button"
                                            aria-label="Clear search"
                                            onClick={() => setQuery("")}
                                            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Showing {visibleItems.length} of {items.length} services
                                </p>
                            </div>
                        </div>

                        {visibleItems.length > 0 ? (
                            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {visibleItems.map((item) => (
                                    <button
                                        key={item._id}
                                        type="button"
                                        onClick={() => navigate(WEBSITE_TYPE_ROUTE)}
                                        className="group flex h-full flex-col rounded-2xl border border-border bg-background p-4 text-left transition hover:border-primary/40 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition group-hover:bg-primary/10 group-hover:text-primary">
                                                <DynamicIcon name={item.iconName || "Sparkles"} className="h-4 w-4" />
                                            </span>
                                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                                AI service
                                            </span>
                                        </div>
                                        <h4 className="mt-4 text-sm font-bold text-foreground">{item.type}</h4>
                                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                            {item.shortDescription || "A ready-to-use AI service for this task."}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition group-hover:text-primary">
                                            Explore service
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                                    <Search className="h-5 w-5" />
                                </span>
                                <h4 className="mt-4 text-base font-bold text-foreground">No AI services found</h4>
                                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                                    Try another search term or clear the filters to see every available service.
                                </p>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="mt-5 inline-flex h-9 items-center justify-center rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}

                        <div className="mt-8 flex justify-center">
                            <Button path={WEBSITE_TYPE_ROUTE} variant="outline" size="lg" arrow={true} className="h-11 px-6">
                                Browse all AI services
                            </Button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export function LandingPage() {
    const { data: blogData } = useBlogs();
    const { data: websiteTypes } = useWebsitetype();
    const posts = blogData?.posts || [];
    const subdomain = getSubdomain();

    if (subdomain === "ipro") {
        return <PropertyPage />;
    }

    if (subdomain === "iflow") {
        return <IflowPage />;
    }

    if (subdomain === "imax") {
        return <ImaxPage />;
    }

    return (
        <div className="agi-theme min-h-screen bg-background text-foreground">
            <Seo
                title="IClouds AI — get everyday work done with AI"
                description="Tell IClouds AI what you need. Choose a service, explain it in plain English, and let AI prepare the steps, helpers and reminders."
                keywords="IClouds AI, AI services, AI usage, AI helpers, automation, everyday tasks, AI assistant"
                url={HOME_ROUTE}
            />
            <Header brandName="IClouds AI" />
            <main>
                <Hero />
                <PlatformSection />
                <WorkflowSection />
                <UseCasesSection />
                <BusinessTypesSection items={(websiteTypes as WebsiteTypeItem[]) || []} />
                <ConfidenceStrip />
                <PricingSection />
                <FAQSection />
                <BlogGrid
                    posts={posts}
                    badge={blogData?.badge}
                    title={blogData?.title}
                    description={blogData?.description}
                    limit={3}
                />
                <CTASection />
            </main>
            <Footer brandName="IClouds AI" />
        </div>
    );
}

function CTASection() {
    return (
        <section className="py-20">
            <div className="container mx-auto max-w-6xl px-4">
                <Reveal>
                    <div className="agi-panel relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12">
                        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />
                        <div className="relative">
                            <h2 className="agi-display mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Try AI on a <span className="agi-accent-text">real task.</span>
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                                Pick a service, explain it in plain English, and let AI prepare the steps, helpers and reminders.
                            </p>
                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                                <Button
                                    path={WEBSITE_TYPE_ROUTE}
                                    size="lg"
                                    arrow={true}
                                    className="h-12 bg-primary px-7 text-base text-primary-foreground hover:bg-primary/90"
                                >
                                    Choose an AI service
                                </Button>
                                <Button
                                    path={CONTACT_US_ROUTE}
                                    variant="outline"
                                    size="lg"
                                    className="h-12 border-border px-7 text-base hover:bg-muted"
                                >
                                    Ask us a question
                                </Button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
