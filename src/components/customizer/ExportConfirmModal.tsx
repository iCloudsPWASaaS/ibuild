import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function ExportConfirmModal({ open, onClose, onConfirm }:any) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white w-[420px] rounded-2xl shadow-2xl p-6"
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center mb-2">
              Export Website
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mb-4">
              This will finalize your website.  
              <span className="block text-red-500 mt-1 font-medium">
                You won’t be able to edit it after export.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="w-full py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                🚀 Confirm Export
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}