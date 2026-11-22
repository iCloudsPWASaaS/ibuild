import { motion, AnimatePresence  } from "motion/react";
import { useState, useEffect } from "react";

import { useReview } from "../../hooks/useReview";
import { APIURL } from "../../api/apiurl";

const Reviewlabel = () => {
   const { data } = useReview();
    const baseurl = APIURL.BASE_URL;

    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = data?.reviews || [];
    


    const currentReview = reviews[currentIndex] || {};

    useEffect(() => {
        if (reviews.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    if (reviews.length === 0) return null;
    
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-md"
            >
                <div className="flex items-center gap-6 mb-4">
                    {/* Avatars Section */}
                    <div className="flex -space-x-3">
                        {reviews.slice(0, 4).map((item: any, i: number) => (
                            <div
                                key={i}
                                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold overflow-hidden gradient-primary-signin  shrink-0"
                            >
                                {item.avatar ? (
                                    <img
                                        src={`${baseurl}${item.avatar}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white uppercase">
                                        {item.name?.charAt(0)}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div>
                        <div className="text-2xl font-bold text-white">
                            {data?.activeUsers}+
                        </div>
                        <div className="text-xs text-white opacity-80 uppercase tracking-wider">
                            Active users
                        </div>
                    </div>
                </div>

                 {/* Review Carousel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentReview._id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm text-white italic line-clamp-2">
                        "{currentReview?.review}"
                    </p>
                    <div className="mt-2 text-[10px] text-white/60 font-medium">
                        — {currentReview?.name}, {currentReview?.role}
                    </div>
                </motion.div>
            </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Reviewlabel;