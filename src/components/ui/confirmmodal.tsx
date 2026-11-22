import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function ConfirmModal({ open, title = "Are you sure?", description, confirmLabel = "Continue", onClose, onConfirm }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              {description && <p className="text-gray-600 mb-6">{description}</p>}
              <div className="flex justify-end gap-3">
                <button onClick={onClose} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100">
                  Cancel
                </button>
                <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-black/80">
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}