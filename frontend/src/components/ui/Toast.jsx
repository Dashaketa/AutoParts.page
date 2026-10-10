// src/components/ui/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, type = "success", show }) {
  const colors = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-pink-600",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, type: "spring" }}
          className={`fixed bottom-8 right-8 bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-xl shadow-xl z-50 flex items-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={type === "error" ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"}
            />
          </svg>
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
