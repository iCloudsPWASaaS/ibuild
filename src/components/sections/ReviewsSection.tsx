import { motion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../ui/sectionheader";
import { useReview } from "../../hooks/useReview";
import { APIURL } from "../../api/apiurl";

interface Review {
    name: string;
    role: string;
    avatar: string;
    rating: number;
    review: string;
}
const baseurl = APIURL.BASE_URL;

const ReviewCard = ({ review }: { review: Review }) => (
    <div className="w-87.5 md:w-100 h-60  shrink-0 p-6 rounded-xl border bg-white mx-4">
        <div className="flex gap-1 mb-4">
            {Array.from({ length: review?.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
        </div>
        <p className="text-primary2 mb-6 line-clamp-3">"{review?.review}"</p>
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary hover-primary rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                {review?.avatar ? (
                    <img
                        src={`${baseurl}${review?.avatar}`}
                        alt={review?.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-lg uppercase">
                        {review?.name?.charAt(0) || "U"}
                    </span>
                )}
            </div>
            <div>
                <div className="font-bold text-black">{review?.name}</div>
                <div className="text-sm text-primary2">{review?.role}</div>
            </div>
        </div>
    </div>
);

export function ReviewsSection({ onGetStarted }: { onGetStarted?: () => void }) {
    const navigate = useNavigate();
    const { data } = useReview();


    const reviews = data?.reviews || [];
    const ratingSummary = data?.ratingSummary;

    const handleGetStarted = () => onGetStarted ? onGetStarted() : navigate("/Websitetype");

    const midPoint = Math.ceil(reviews.length / 2);
    const firstRow = reviews.slice(0, midPoint);
    const secondRow = reviews.slice(midPoint);

    const row1 = [...firstRow, ...firstRow, ...firstRow, ...firstRow];
    const row2 = [...secondRow, ...secondRow, ...secondRow, ...secondRow];

    return (
        <section id="reviews" className="py-20 bg-white border-y overflow-hidden relative">
            <div className="absolute top-[10%] right-[25%] w-200 h-200 rounded-full bg-primary opacity-20 blur-[120px]" />

            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-16">
                    <SectionHeader
                        badge={data?.badge}
                        special=""
                        title={data?.title}
                        description={data?.description}
                    />
                    {ratingSummary && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <div className="flex">
                                {Array.from({ length: ratingSummary?.score || 0 }).map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-lg font-medium text-black">{ratingSummary?.text}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-8 mb-12 relative">
                <div className="absolute top-0 bottom-0 left-0 w-10 md:w-32 z-10 bg-linear-to-r dark:from-black from-white to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-10 md:w-32 z-10 bg-linear-to-l dark:from-black from-white to-transparent pointer-events-none" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex"
                        initial={{ x: "-50%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    >
                        {row1.map((review: Review, index: number) => (
                            <ReviewCard key={`row1-${index}`} review={review} />
                        ))}
                    </motion.div>
                </div>

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex"
                        initial={{ x: "0%" }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    >
                        {row2.map((review: Review, index: number) => (
                            <ReviewCard key={`row2-${index}`} review={review} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 text-center">
                <p className="text-primary2 mb-4">Join thousands of satisfied customers</p>
                <Button size="lg" onClick={handleGetStarted} className="gradient-primary">
                    Start Building Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </section>
    );
}