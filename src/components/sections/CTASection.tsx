import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useCta } from "../../hooks/useCta";

interface CTASectionProps {
    onGetStarted?: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
    const navigate = useNavigate();
    const { data } = useCta()
    let ctadata = data?.cta



    const handleGetStarted = () => {
        if (onGetStarted) {
            onGetStarted();
        } else {
            navigate("/Websitetype");
        }
    };

    return (
        <section className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="container mx-auto px-4 max-w-6xl"
            >
                {/* Main Card Wrapper */}
                <div className="relative overflow-hidden gradient-primary hover-primary rounded-2xl p-12 text-center text-white shadow-2xl">

                    {/* --- BACKGROUND LAYERS --- */}

                    {/* 1. Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.1]"
                        style={{
                            backgroundImage: 'linear-gradient(var(--grid-line-white) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-white) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* --- GEOMETRIC SHAPES ANIMATION --- */}

                    {/* Left Side: Floating Circle & Square */}
                    <motion.div
                        className="absolute top-10 -left-10 w-32 h-32 border-4 border-white/10 rounded-full"
                        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-10 left-10 w-16 h-16 bg-white/5 rounded-xl backdrop-blur-sm rotate-12"
                        animate={{ rotate: [12, 45, 12], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Right Side: Triangle & Circle */}
                    <motion.div
                        className="absolute top-10 right-10 opacity-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-white">
                            <path d="M50 15 L90 85 L10 85 Z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[-50px] -right-10 w-48 h-48 border border-white/10 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating Square Small */}
                    <motion.div
                        className="absolute top-1/2 right-32 w-8 h-8 border-2 border-white/20"
                        animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* --- MAIN CONTENT --- */}
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                            {ctadata?.title}
                        </h2>
                        <p className="text-xl mb-8 opacity-90 text-white max-w-2xl mx-auto leading-relaxed">
                            {ctadata?.description}
                        </p>

                        <Button
                            size="lg"
                            variant="secondary"
                            onClick={handleGetStarted}
                            className="bg-white-fix text-primary hover:bg-gray-100 font-semibold px-8 h-12 text-base shadow-lg shadow-black/10"
                        >
                            Generate My Website
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <p className="mt-6 text-sm text-white/70 font-medium tracking-wide uppercase">
                            {ctadata?.subtitle}
                        </p>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}