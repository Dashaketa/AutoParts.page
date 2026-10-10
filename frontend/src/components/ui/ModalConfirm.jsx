// src/components/ui/ModalConfirm.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModalConfirm({ show, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Fondo oscuro opcional */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel} // opcional si quieres cerrar al hacer clic fuera
          />

          {/* Card del modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-red-200 z-50">
              <h2 className="text-xl font-bold text-red-600 mb-4">{title}</h2>
              <p className="text-gray-700 mb-6">{message}</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
