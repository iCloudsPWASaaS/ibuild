import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface SectionHeaderProps {
    variant?:string;
    badge?: string;
    title?: string;
    description?: string;
    special?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
    className?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export function SectionHeader({
    variant = "section",
    badge,
    title,
    description,
    showSearch = false,
    searchPlaceholder = "Search articles...",
    className,
    searchValue,
    onSearchChange
}: SectionHeaderProps) {

    if (variant === "hero") {
        const heroBadge = badge?.trim() || "IClouds AI";
        const heroTitle = title?.trim() || "Find the right AI help for every task.";
        const heroDescription = description?.trim() || "Choose a service, describe your task in plain English, and let IClouds AI prepare the rest.";

        return (
            <section className={`relative overflow-hidden py-16 pt-35 px-4 mb-10 banner-gradient text-white ${className} z-10`}>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />
                    <div
                        className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(24,24,27,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.06) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>
                <div className="container relative mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="secondary" className="mb-4 bg-blue-soft badge-hero-primary text-sm">
                            {heroBadge}
                        </Badge>

                        <h1
                            className="text-4xl md:text-6xl font-bold mb-6 text-white highlightbg"
                            dangerouslySetInnerHTML={{ __html: heroTitle }}
                        />

                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                            {heroDescription}
                        </p>

                        {showSearch && (
                            <div className="max-w-xl mx-auto px-4 ">
                                <div className="relative mt-8">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-400" />
                                    <Input
                                        placeholder={searchPlaceholder}
                                        value={searchValue}
                                        onChange={(e) => onSearchChange?.(e.target.value)}
                                        className="pl-12 h-12 bg-white text-black"
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <div className={`container mx-auto text-center mb-16 z-10 relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {badge && <Badge className="mb-5">{badge}</Badge>}

                <h2 className="text-4xl text-black md:text-[38px] highlight font-bold mb-4 " dangerouslySetInnerHTML={{ __html: title || "" }}>
                 
                </h2>

                {description && (
                    <p className="text-xl text-primary2">{description}</p>
                )}
            </motion.div>
        </div>
    );
}