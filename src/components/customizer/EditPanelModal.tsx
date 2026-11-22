import { motion, AnimatePresence } from "framer-motion";
import { DynamicEditPanel } from "./DynamicEditPanel";

export default function EditPanelModal({ open, onClose, section, schema, onChange }: any) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-end z-50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="bg-white rounded-0 shadow-2xl w-full max-w-xl p-6 h-full">

              {/* Title */}
              <div className="flex justify-between gap-3 mb-5">
                <h2 className="text-xl font-semibold mb-2">
                  Edit {section.type}
                </h2>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>

              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-120px)] w-full">
                <DynamicEditPanel
                  section={section}
                  schema={schema}
                  onChange={onChange}
                />
              </div>
              {/* Actions */}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}