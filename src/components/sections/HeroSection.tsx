import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Tagline } from "../ui/tagline";
import { useHero } from "../../hooks/useHero";
import { initHeroAnimations, minutesContainerVariants, typingContainerVariants, typingLetterVariants } from "../../helper/herohelper";
import DynamicIcon from "../ui/icon";
import Loader from "../loader/loader";
import { PRICING_ROUTE, WEBSITE_TYPE_ROUTE } from "../../helper/routes";
import { isAuthenticated } from "../../helper/auth";

interface StatItem {
    id: number;
    label: string;
    value: string;
    icon: string;
}

interface HeroSectionProps {
    onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
    const navigate = useNavigate();
    const sectionRef = useRef<any>(null);
    const particlesContainerRef = useRef<any>(null);

    const [startLoop, setStartLoop] = useState(false);
    const [animationTick, setAnimationTick] = useState(0);
    const [waveIndex, setWaveIndex] = useState(0);
    const [trendingIndex, setTrendingIndex] = useState(0);
    const [isMinLoading, setIsMinLoading] = useState(true);

    const { data, isLoading } = useHero();

    const suffixList = useMemo(() => {
        if (!data?.headline.suffix) return [];
        return data.headline.suffix.split(",").map((word: any) => word.trim()).filter((word: any) => word.length > 0);
    }, [data]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoading(isLoading);
        }, 400);
        return () => clearTimeout(timer);
    }, [isLoading]);

    useEffect(() => {
        if (!data) return;
        return initHeroAnimations({
            data,
            startLoop,
            sectionRef,
            particlesContainerRef,
            setWaveIndex,
            setTrendingIndex
        });
    }, [data, startLoop]);

    useEffect(() => {
        let interval: any;
        if (startLoop && suffixList.length > 0) {
            interval = setInterval(() => {
                setAnimationTick((prev) => prev + 1);
            }, 3500);
        }
        return () => clearInterval(interval);
    }, [startLoop, suffixList]);

    const handleGetStarted = () => {
        if (onGetStarted) {
            onGetStarted();
        } else {
            navigate("/websitetype");
        }
    };

    if (isMinLoading) {
        return <Loader show={true} />;
    }

    const currentSuffix = suffixList[animationTick % suffixList.length] || "";

    return (
        <section ref={sectionRef} className="relative w-full pt-20 md:pt-18 overflow-hidden">
            <div className="gradient-bg-wrapper pointer-events-none">
                <div className="gradient-sphere sphere-center-blue"></div>
                <div className="glow"></div>
                <div className="grid-overlay"></div>
                <div className="noise-overlay"></div>
                <div className="particles-container" ref={particlesContainerRef}></div>
            </div>

            <div className="relative z-10 mx-auto px-4 py-12 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-7xl mx-auto"
                >
                    {data?.trendingBadge.length > 0 && data.stats.length > 0 && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-soft badge-hero-primary rounded-full mb-6 max-w-[90%] md:max-w-full">
                            <TrendingUp className="w-4 h-4 shrink-0" />
                            <span className="text-xs sm:text-sm font-medium truncate">
                                {data.trendingBadge[trendingIndex % data.trendingBadge.length]}
                            </span>
                        </div>
                    )}

                    <div className="mb-6 h-auto min-h-[6rem] sm:min-h-[4.5rem] flex items-center justify-center">
                        <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold pb-2 leading-snug sm:leading-tight flex flex-col justify-center items-center">
                            <motion.span
                                className="heading-gradient bg-clip-text text-transparent inline-flex flex-wrap  md:flex-wrap justify-center mr-2 md:mr-3"
                                variants={typingContainerVariants}
                                initial="hidden"
                                animate="visible"
                                onAnimationComplete={() => setStartLoop(true)}
                            >
                                {data?.headline.prefix.split("").map((char: string, index: number) => (
                                    <motion.span key={index} variants={typingLetterVariants}>
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.span>
                            <span className="inline-flex relative min-w-[160px] sm:min-w-[220px] md:min-w-[320px] justify-start md:justify-center h-[1.2em]">
                                <AnimatePresence mode="wait">
                                    {startLoop && (
                                        <motion.span
                                            key={animationTick}
                                            variants={minutesContainerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="heading-gradient bg-clip-text text-transparent inline-flex absolute left-0 md:relative"
                                        >
                                            {currentSuffix.split("").map((char: string, i: number) => (
                                                <motion.span key={i} variants={{
                                                    hidden: { y: -50, opacity: 0, filter: "blur(8px)" },
                                                    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 120 } },
                                                    exit: { x: 80, opacity: 0, filter: "blur(15px)", scale: 1.2, transition: { duration: 0.8, ease: "easeInOut" } }
                                                }} className="inline-block word-gradient bg-clip-text text-transparent" >
                                                    {char === " " ? "\u00A0" : char}
                                                </motion.span>
                                            ))}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </span>
                        </h1>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl text-black mb-8 max-w-2xl mx-auto px-2">
                        {data?.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
                        <Button
                            size="lg"
                            onClick={handleGetStarted}
                            className="w-full sm:w-auto"
                            shadowColor="var(--button-shadow-blue)"
                            arrow={true}
                        >
                            Generate AI App
                        </Button>
                        <Button
                            path={isAuthenticated() ? WEBSITE_TYPE_ROUTE : PRICING_ROUTE}
                            shadowColor="var(--button-shadow-blue)"
                            variant={'secondary'}
                            size="lg"
                            className=" w-full sm:w-auto"
                        >
                            Explore Free Plan
                        </Button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-black flex-wrap px-2">
                        {data?.features.map((feature: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <DynamicIcon name={'CheckCircle'} className="w-4 h-4 sm:w-5 sm:h-5 check-color  flex-shrink-0" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="mt-12 md:mt-16 flex flex-wrap justify-center gap-3 md:gap-6 px-2"
                >
                    {data?.stats.map((stat: StatItem, index: number) => {
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.08 }}
                                className="p-3 md:p-4 bg-white  rounded-xl shadow-lg dark:shadow-[0_10px_25px_rgba(255,255,255,0.05)]  text-center
                                w-[calc(50%-0.5rem)] 
                                md:w-[calc(25%-0.75rem)]   
                                min-[900px]:w-40 
                                lg:w-51 
                                xl:w-51 
                                flex-shrink-0"
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <DynamicIcon
                                        name={stat.icon}
                                        className="w-5 h-5 md:w-6 md:h-6 text-primary"
                                    />
                                </div>

                                <motion.div
                                    className="text-2xl md:text-3xl font-bold banner-text-gradient break-all"
                                    animate={{ scale: waveIndex === index ? [1, 1.1, 1.1] : 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {stat.value}
                                </motion.div>

                                <div className="text-xs md:text-sm text-primary2 mt-1 truncate">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
            <Tagline />
        </section>
    );
}