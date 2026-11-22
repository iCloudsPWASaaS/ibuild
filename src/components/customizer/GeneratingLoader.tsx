import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export function GeneratingLoader() {
    return (
        <AnimatePresence>
            <motion.div
                className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Loader2 className="w-8 h-8 animate-spin text-black mb-3" />

                <p className="text-gray-700 text-sm">
                    Generating your website...
                </p>
            </motion.div>
        </AnimatePresence>
    );
}