// src/components/ui/ConfirmModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "default"
}) {
  const typeColors = {
    default: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
              <p className="mb-6 text-gray-700">{message}</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onCancel}
                  className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-5 py-2 rounded-lg text-white font-semibold transition ${typeColors[type] || typeColors.default}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
