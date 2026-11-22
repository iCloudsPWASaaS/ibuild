import { useState } from "react";
import { motion } from "motion/react";
import { Button, SectionHeader } from "../ui/index";
import { useNavigate } from "react-router-dom";
import { usePortfoliosection } from "../../hooks/usePortfolioSection";
import { APIURL } from "../../api/apiurl";

interface CreationSectionProps {
    onGetStarted?: () => void;
    showAll?: boolean;
    varient?: string;
}

const baseurl = APIURL.BASE_URL;

export function CreationSection({ showAll = false, varient }: CreationSectionProps) {
    const navigate = useNavigate();
    const { data } = usePortfoliosection();
    const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    const displayData = showAll ? data?.data : data?.data?.slice(0, 6);

    return (
        <section className={`py-20 border-y relative overflow-hidden bg-background ${showAll ? 'pt-32' : ''}`}>
            <SectionHeader
                badge={data?.badge}
                variant={varient}
                special={data?.special}
                title={showAll ? "Our Full Portfolio" : data?.title}
                description={data?.description}
            />
            <div className="absolute bottom-0 left-0 right-0 h-125 pointer-events-none select-none overflow-hidden">
                <div className="bottom-blue-glow" />
            </div>
            <div className="container px-4 mx-auto max-w-6xl relative z-10">

                <div className="grid md:grid-cols-3 gap-8 mb-12 place-items-start mt-12">
                    {displayData?.map((template: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group w-full"
                        >
                            <div className="h-auto w-full overflow-hidden rounded-xl mb-4 relative shadow-md border border-transparent hover:border-primary/20 transition-colors bg-gray-100 dark:bg-zinc-900">
                                {!loadedImages[index] && (
                                    <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                                )}
                                <img
                                    src={`${baseurl}${template?.image}`}
                                    alt={template?.title}
                                    onLoad={() => handleImageLoad(index)}
                                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${loadedImages[index] ? "opacity-100" : "opacity-0"
                                        }`}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            <h3 className="font-bold text-black dark:text-white text-xl mb-2">{template?.title}</h3>
                            <p className="text-primary2  line-clamp-2">{template?.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {!showAll && data?.data?.length > 6 && (
                    <div className="text-center">
                        <Button size="lg" onClick={() => navigate("/portfolio")} arrow={true} shadowColor={'#001145'}>
                            View More
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}