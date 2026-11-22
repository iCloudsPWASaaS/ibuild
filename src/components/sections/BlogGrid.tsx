import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";
import { SectionHeader } from "../ui/sectionheader";
import { APIURL } from "../../api/apiurl";

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    image: string;
    thumbnail: string;
}

interface BlogGridProps {
    posts: BlogPost[];
    limit?: number;
    className?: string;
    showHeader?: boolean;
    // Added Dynamic Header Props
    badge?: string;
    title?: string;
    description?: string;
}

const baseurl = APIURL.BASE_URL;

export function BlogGrid({
    posts,
    limit,
    className = "",
    showHeader = true,
    badge,
    title,
    description
}: BlogGridProps) {
    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

    const displayPosts = limit ? posts.slice(0, limit) : posts;

    const handleImageLoad = (id: number) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-20 relative z-10 bg-transparent">
            {showHeader && (
                <SectionHeader
                    // Agar props pass nahi hote toh fallback (||) text dikhayega
                    badge={badge || "Blogs"}
                    special=""
                    title={title || "Transforming Ideas Into Intelligent Web Solutions"}
                    description={description || "We turn innovative ideas into intelligent, scalable web solutions using modern technologies."}
                />
            )}

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
                {displayPosts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl border overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                        onClick={() => navigate('/blogdetails/' + post.id)}
                    >
                        <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-900">
                            {!loadedImages[post.id] && (
                                <div className="z-10 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                            )}
                            <img
                                src={`${baseurl}${post.thumbnail}`}
                                alt={post.title}
                                onLoad={() => handleImageLoad(post.id)}
                                className={`w-full group-hover:scale-105 transition-all duration-300 ${loadedImages[post.id] ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        </div>

                        <div className="p-6">
                            <Badge variant="secondary" className="mb-3 text-primary2">
                                {post.category}
                            </Badge>

                            <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors text-black dark:text-white">
                                {post.title}
                            </h3>

                            <p className="text-primary2 mb-4 line-clamp-2 dark:text-zinc-400">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-primary2 mb-4 dark:text-zinc-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t dark:border-zinc-800">
                                <div className="w-8 h-8 banner-gradient rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {post.author?.charAt(0) || "A"}
                                </div>
                                <span className="text-sm font-medium text-black dark:text-zinc-300">
                                    {post.author}
                                </span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    );
}