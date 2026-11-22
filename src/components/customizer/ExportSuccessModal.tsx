import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function ExportSuccessModal({ open, onDownload, onDashboard }:any) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white w-[420px] rounded-2xl shadow-2xl p-6 text-center"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-14 h-14 text-green-500" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-2">
              🎉 Website Exported!
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6">
              Your website has been successfully generated and is ready to use.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onDownload}
                className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                ⬇ Download ZIP
              </button>

              <button
                onClick={onDashboard}
                className="w-full py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}