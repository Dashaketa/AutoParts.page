// src/components/dashboard/Cart.jsx
import React, { useEffect, useState } from 'react';
import CheckoutButton from './CheckoutButton';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../ui/Toast';

export default function Cart({ cartItems, total, onUpdateQuantity, onRemove }) {
  const [displayTotal, setDisplayTotal] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    let start = 0;
    const end = total;
    if (end === 0) {
      setDisplayTotal(0);
      return;
    }
    const duration = 600;
    const increment = Math.ceil(end / (duration / 20));
    const timer = setInterval(() => {
      start = Math.min(start + increment, end);
      setDisplayTotal(start);
      if (start === end) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Carrito items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#1789FC] to-[#0d5ca8] px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Productos Seleccionados</h2>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
              </div>

              <div className="p-6 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <AnimatePresence>
                  {cartItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="mt-4 text-xl font-medium text-gray-700">Tu carrito está vacío</h3>
                      <p className="mt-2 text-gray-500">Agrega productos para continuar</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={`http://localhost:3000/uploads/${item.image}`}
                              alt={item.name}
                              className="w-20 h-20 object-contain rounded-lg bg-white p-2 border border-gray-200"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>

                            <div className="mt-3 flex items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Cantidad:</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={e => {
                                    const nuevaCantidad = parseInt(e.target.value, 10);
                                    if (nuevaCantidad > item.stock) {
                                      showToast(`No puedes agregar más de ${item.stock} unidades disponibles.`, "error");
                                      return;
                                    }
                                    onUpdateQuantity(item.id, nuevaCantidad);
                                  }}
                                  className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>

                              <button
                                onClick={() => onRemove(item.id)}
                                className="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>

                            <div className="mt-2">
                              <p className="text-lg font-bold text-blue-600">
                                ${(item.quantity * item.price).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${item.price.toLocaleString()} c/u
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="h-full">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Detalles de Pago</h2>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-600 mb-2">Total a pagar</p>
                <p className="text-5xl font-extrabold text-blue-600 mb-4 text-center">
                  ${displayTotal.toLocaleString()}
                </p>
                <p className="text-gray-600 text-center">
                  Incluye impuestos aplicables
                </p>
              </div>

              <div className="p-6 pt-0">
                <CheckoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
}
