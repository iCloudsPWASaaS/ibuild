import React from 'react';
import { motion, } from 'framer-motion';
import type { Variants } from "framer-motion";
import Seo from '../../../components/seo/Seo';
import { NOT_FOUND_ROUTE } from '../../../helper/routes';

const NotFoundPage: React.FC = () => {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <>
            <Seo url={NOT_FOUND_ROUTE} />
            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">

                {/* Background Ambient Glow Elements */}
                <div className="absolute top-[-5%] left-[-5%] w-64 h-64 md:w-96 md:h-96 rounded-full glow-blob-primary pointer-events-none animate-pulse" />
                <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 md:w-96 md:h-96 rounded-full glow-blob-secondary pointer-events-none animate-pulse" />

                <motion.div
                    className="relative z-10 flex flex-col items-center text-center px-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    {/* Floating 404 Text */}
                    <motion.div animate={{
                        y: [0, -20, 0],
                        transition: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}>
                        <h1 className="text-[9rem] md:text-[13rem] font-black leading-none text-gradient-custom select-none drop-shadow-sm mb-10">
                            404
                        </h1>
                    </motion.div>

                    {/* Heading & Description */}
                    <motion.div variants={itemVariants} className="space-y-4 -mt-4 md:-mt-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            Lost in Space?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
                            The page you are looking for doesn't exist or has been moved.
                            Don't worry, we can help you find your way back.
                        </p>
                    </motion.div>

                    {/* Buttons Group */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center"
                    >
                        {/* Primary Button (Home) */}
                        <button
                            onClick={() => window.location.href = '/'}
                            className="btn-primary-custom px-8 py-4 rounded-full font-bold text-sm tracking-widest flex items-center justify-center gap-2"
                        >
                            <svg
                                className="w-4 h-4 btn-icon transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            BACK TO HOME
                        </button>

                    </motion.div>

                </motion.div>
            </div>
        </>
    );
};

export default NotFoundPage;