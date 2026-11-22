import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button, SectionHeader } from "../ui/index";
import { useNavigate } from "react-router-dom";
import { useHowitWork } from "../../hooks/useHowitWork";
import { APIURL } from "../../api/apiurl";
import DynamicIcon from "../ui/icon";

const stepStyles = [
    { gradient: "from-purple-500 to-purple-600", delay: 0 },
    { gradient: "from-blue-500 to-blue-600", delay: 0.2 },
    { gradient: "from-pink-500 to-pink-600", delay: 0.4 },
    { gradient: "from-green-500 to-green-600", delay: 0.6 }
];

const baseurl = APIURL.BASE_URL;

interface HowitWorksProps {
    headerVariant?: "section" | "hero",
    onGetStarted?: () => void;
    setIsMinLoading?: (show: boolean) => void;
}

export function HowItWorksSection({ headerVariant, onGetStarted, setIsMinLoading }: HowitWorksProps) {
    const navigate = useNavigate();
    const { data, isLoading } = useHowitWork();
    const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

    const handleGetStarted = () => onGetStarted ? onGetStarted() : navigate("/Websitetype");
    const handleImageLoad = (index: number) => setLoadedImages((prev) => ({ ...prev, [index]: true }));

    const gridSize = 30;
    const starLines = Array.from({ length: 33 }, (_, i) => (i - 16) * 3);
    useEffect(() => {
        setIsMinLoading && setIsMinLoading(isLoading);
    }, [isLoading]);
    return (
        <section className="md:px-0 border-b">
            <div id="how-it-works" className="relative py-20 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15]"
                        style={{
                            backgroundImage: `linear-gradient(to right, var(--grid-line-blue) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-blue) 1px, transparent 1px)`,
                            backgroundSize: `${gridSize}px ${gridSize}px`,
                            backgroundPosition: 'center top'
                        }}
                    />
                    <div className="absolute inset-0 flex justify-center">
                        {starLines?.map((offset, i) => (
                            <div key={i} className="absolute h-full w-px" style={{ left: `calc(50% + ${offset * gridSize}px)` }}>
                                <motion.div
                                    initial={{ top: "-20%", opacity: 0 }}
                                    animate={{ top: "120%", opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: Math.random() * 15 + 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: Math.random() * 30,
                                        repeatDelay: Math.random() * 15 + 10
                                    }}
                                    className="absolute left-1/2 -translate-x-1/2 w-[1px] h-[50px]"
                                    style={{ background: `linear-gradient(to bottom, transparent, var(--primary-color2))`, boxShadow: '0 0 15px var(--primary-color2)' }}
                                >
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-[var(--primary-color2)] rounded-full" />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                <SectionHeader variant={headerVariant} badge={data?.badge} special={data?.special} title={data?.title} description={data?.description} />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="relative">
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary" />
                        <div className="space-y-24 px-4">
                            {data?.steps?.map((step: any, index: number) => {
                                const style = stepStyles[index] || stepStyles[0];
                                const isReversed = index % 2 === 1;
                                const stepNumber = String(index + 1).padStart(2, '0');

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: style.delay }}
                                        viewport={{ once: true }}
                                        className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
                                    >
                                        <div className={isReversed ? "lg:order-2" : ""}>
                                            <div className="relative">
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    whileInView={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: style.delay + 0.2 }}
                                                    viewport={{ once: true }}
                                                    className="absolute -top-8 -left-8 text-9xl font-bold text-gray-soft"
                                                >
                                                    {stepNumber}
                                                </motion.div>

                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <motion.div
                                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                                            transition={{ duration: 0.5 }}
                                                            className={`w-16 h-16 flex-shrink-0 bg-gradient-to-br ${style.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}
                                                        >
                                                            <DynamicIcon name={step.icon} className="w-8 h-8 text-white" />
                                                        </motion.div>
                                                        <div>
                                                            <span className="text-sm font-bold text-primary">STEP {stepNumber}</span>
                                                            <h3 className="text-3xl font-bold text-black dark:text-white">{step.title}</h3>
                                                        </div>
                                                    </div>

                                                    <p className="text-lg text-primary2 dark:text-zinc-400 mb-6">{step.desc}</p>

                                                    <div className="grid grid-cols-2 gap-3 relative place-items-center">
                                                        <div className="absolute top-[-100%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary opacity-0 dark:opacity-20 blur-[120px]" />
                                                        {step.features.map((feature: any, i: number) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                whileInView={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: style.delay + 0.3 + i * 0.1 }}
                                                                viewport={{ once: true }}
                                                                className="flex  items-center gap-2 p-3 rounded-xl border green-hover transition-colors bg-background/50 backdrop-blur-sm dark:border-zinc-800  w-full"
                                                            >
                                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                                <span className="text-sm font-medium dark:text-zinc-200">{feature}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={isReversed ? "lg:order-1" : ""}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: style.delay + 0.2 }}
                                                viewport={{ once: true }}
                                                whileHover={{ scale: 1.05 }}
                                                className="relative w-full flex justify-center"
                                            >
                                                <div className="w-full max-w-[530px]  rounded-[2.5rem] gradient-primary-howitwork p-5 shadow-2xl relative group  overflow-hidden">
                                                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                                        {!loadedImages[index] && (
                                                            <div className="absolute inset-0 z-10 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
                                                        )}
                                                        <img
                                                            src={`${baseurl}` + step.image}
                                                            alt={step.title}
                                                            onLoad={() => handleImageLoad(index)}
                                                            className={`w-full h-full object-contain transition-all duration-700 group-hover:scale-110 z-20 relative  ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                                                    </div>
                                                </div>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-3xl blur-3xl opacity-20 -z-10`} />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Button size="lg" onClick={handleGetStarted} arrow={true} className="gradient-primary  px-8 py-6">
                            Start Building Now
                        </Button>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                            {data?.features?.map((item: any, index: number) => (
                                <React.Fragment key={index}>
                                    <span className="text-sm text-primary2 dark:text-zinc-400 font-medium">{item}</span>
                                    {index < data?.features.length - 1 && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary2/50" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}