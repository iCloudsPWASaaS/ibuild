import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Twitter, Facebook, Linkedin } from "lucide-react";
import { Button, Badge, Footer, Header, SectionHeader, CTASection } from "../../../components/index";
import { useBlogdetails } from "../../../hooks/useBlogdetails";
import { useParams } from "react-router";
import { APIURL } from "../../../api/apiurl";
import Seo from "../../../components/seo/Seo";
import { BLOG_DETAILS_ROUTE } from "../../../helper/routes";
const baseurl = APIURL.BASE_URL;

export function BlogDetailPage() {
    const { id } = useParams();
    const { data } = useBlogdetails(id);

    const [relatedLoaded, setRelatedLoaded] = useState<{ [key: number]: boolean }>({});

    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, []);

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank"
        );
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
            "_blank"
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                shareUrl
            )}`,
            "_blank"
        );
    };



    useEffect(() => {
        setRelatedLoaded({});
        window.scrollTo(0, 0);
    }, [id]);

    const handleRelatedLoad = (index: number) => {
        setRelatedLoaded((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <div className="min-h-screen">
            <Seo
                title={data?.blogdetails?.title}
                description={
                    data?.blogdetails?.content
                        ?.replace(/<[^>]+>/g, "")
                        ?.substring(0, 160) || "Read this blog on AI & Automation"
                }
                image={`${baseurl}${data?.blogdetails?.image}`}
                url={BLOG_DETAILS_ROUTE}
            />
            <Header isWhite={true} />
            <SectionHeader variant="hero" badge={data?.badge} title={data?.title} description={data?.description} />

            <article className="container mx-auto px-4 max-w-4xl mt-10">
                <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge className="mb-4">{data?.blogdetails?.category}</Badge>
                    <h1 className="text-4xl md:text-5xl text-black dark:text-white font-bold mb-6">
                        {data?.blogdetails?.title}
                    </h1>

                    <div className="flex items-center gap-6 mb-8 pb-8 border-b dark:border-zinc-800">
                        <div className="flex items-center gap-4 text-sm text-primary2">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{data?.blogdetails?.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{data?.blogdetails?.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-[7/3] rounded-2xl mb-12 overflow-hidden bg-gray-100 dark:bg-zinc-900">
                        <img
                            key={`${id}-main`}
                            src={`${baseurl}${data?.blogdetails?.image}`}
                            alt={data?.blogdetails?.title}
                            className={`absolute inset-0 w-full  object-cover transition-opacity duration-500 opacity-100}`}
                        />
                    </div>

                    <div
                        className="prose prose-lg max-w-none mb-12 dark:text-zinc-300"
                        dangerouslySetInnerHTML={{ __html: data?.blogdetails?.content }}
                        style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.75'
                        }}
                    ></div>

                    <div className="py-8 border-y dark:border-zinc-800 mb-12">
                        <div className="flex items-center justify-start flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-primary2 mr-2">Share:</span>
                                <Button onClick={shareOnTwitter} variant="ghost" size="icon" className="dark:hover:bg-zinc-800"><Twitter className="w-4 h-4" /></Button>
                                <Button onClick={shareOnFacebook} variant="ghost" size="icon" className="dark:hover:bg-zinc-800"><Facebook className="w-4 h-4" /></Button>
                                <Button onClick={shareOnLinkedIn} variant="ghost" size="icon" className="dark:hover:bg-zinc-800"><Linkedin className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </article>

            {data?.blogdetails?.relatedPosts?.length > 0 && (
                <section className="py-16 bg-white dark:bg-zinc-950">
                    <div className="container px-4 mx-auto max-w-6xl">

                        <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">Related Articles</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {data?.blogdetails?.relatedPosts?.map((post: any, index: number) => (
                                <a href={'/blogdetails/' + post.id}>
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg border dark:border-zinc-800 cursor-pointer hover:shadow-xl transition-all group"
                                    >
                                        <div className="relative  overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                            {!relatedLoaded[index] && (
                                                <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                                            )}
                                            <img
                                                src={`${baseurl}${post.image}`}
                                                alt={post.title}
                                                onLoad={() => handleRelatedLoad(index)}
                                                className={`w-full  group-hover:scale-105 transition-all duration-500 ${relatedLoaded[index] ? "opacity-100" : "opacity-0"}`}
                                            />
                                        </div>

                                        <div className="p-6">
                                            <Badge variant="secondary" className="mb-3 text-black dark:text-zinc-200">
                                                {post.category}
                                            </Badge>
                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors text-black dark:text-white">
                                                {post.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <CTASection />
            <Footer />
        </div>
    );
}