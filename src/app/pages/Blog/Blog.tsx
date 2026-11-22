import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button, Badge, Footer, Header, BlogGrid, SectionHeader, CTASection } from "../../../components/index";
import { useNavigate } from "react-router";
import { useBlogs } from "../../../hooks/useBlog";
import { useCategory } from "../../../hooks/useCategory";
import { APIURL } from "../../../api/apiurl";
import Seo from "../../../components/seo/Seo";
import { BLOG_ROUTE } from "../../../helper/routes";

const baseurl = APIURL.BASE_URL;

export function BlogsPage() {
    const navigate = useNavigate();
    const { data: blogData, isLoading } = useBlogs();
    const { data: categoryData } = useCategory();

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() => {
        const cats = categoryData?.items || [];
        const uniqueCats = cats.filter((c: string) => c.toLowerCase() !== "all");
        return ["All", ...uniqueCats];
    }, [categoryData]);

    const allPosts = blogData?.posts || [];

    const filteredPosts = useMemo(() => {
        return allPosts.filter((post: any) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || post.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [allPosts, searchQuery, activeCategory]);

    const featuredPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    return (
        <div className="min-h-screen">
            <Seo url={BLOG_ROUTE} page="blog"/>
            <Header isWhite={true} loading={isLoading} />
            <SectionHeader
                variant="hero"
                badge={blogData?.badge || "Blog"}
                title={blogData?.title || "Our Blogs"}
                description={blogData?.description}
                showSearch={true}
                searchPlaceholder="Search articles..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <section className="py-5 px-4 border-b bg-white sticky top-[73px] z-40">
                <div className="container mx-auto">
                    <div className="flex items-center gap-3 overflow-x-auto p-2 scrollbar-hide">
                        {categories.map((category: string, index: number) => (
                            <Button
                                key={index}
                                variant={activeCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(category)}
                                className={activeCategory === category ? "gradient-primary text-white" : "text-primary2"}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                        {!searchQuery && (

                    <div className="flex items-center gap-2 mb-8">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-bold text-black">Featured Article</h2>
                    </div>
                        )}
                    {featuredPost ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-xl border cursor-pointer hover:shadow-2xl transition-shadow"
                            onClick={() => navigate('/blogdetails' + `/${featuredPost.id}`)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={`${baseurl}` + featuredPost.image}
                                    alt={featuredPost.title}
                                    className="absolute inset-0 h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            <div className="p-8 flex flex-col justify-center">
                                <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                                <h3 className="text-3xl font-bold mb-4 text-black">
                                    {featuredPost.title}
                                </h3>
                                <p className="text-primary2 mb-6">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-primary2 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{featuredPost.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{featuredPost.readTime}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 banner-gradient rounded-full flex items-center justify-center text-white font-bold">
                                            {featuredPost.author.charAt(0)}
                                        </div>
                                        <span className="font-medium text-black">
                                            {featuredPost.author}
                                        </span>
                                    </div>
                                    <Button variant="link" className="text-primary">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-10 text-primary2">No articles found matching your criteria.</div>
                    )}
                </div>
            </section>


            <section className="py-1 bg-white">
                <div className="container mx-auto max-w-6xl">
                    {gridPosts.length > 0 && (
                        <BlogGrid
                            posts={gridPosts}
                            showHeader={false}
                            badge={blogData?.badge}
                            title={blogData?.title}
                            description={blogData?.description}
                        />
                    )}
                </div>
            </section>

            <CTASection />
            <Footer />
        </div>
    );
}