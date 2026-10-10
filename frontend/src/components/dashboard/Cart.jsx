"use client"

import { useEffect, useState } from "react"
import CheckoutButton from "./CheckoutButton"
import { motion, AnimatePresence } from "framer-motion"
import Toast from "../ui/Toast"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function Cart({ cartItems, total, onUpdateQuantity, onRemove }) {
  const [displayTotal, setDisplayTotal] = useState(0)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000)
  }

  useEffect(() => {
    let start = 0
    const end = total
    if (end === 0) {
      setDisplayTotal(0)
      return
    }

    const duration = 600
    const increment = Math.ceil(end / (duration / 20))
    const timer = setInterval(() => {
      start = Math.min(start + increment, end)
      setDisplayTotal(start)
      if (start === end) clearInterval(timer)
    }, 20)

    return () => clearInterval(timer)
  }, [total])

  const handleQuantityChange = (itemId, newQuantity, maxStock) => {
    if (newQuantity > maxStock) {
      showToast(`No puedes agregar más de ${maxStock} unidades disponibles.`, "error")
      return
    }
    if (newQuantity < 1) return
    onUpdateQuantity(itemId, newQuantity)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Tu Carrito de Compras
          </h1>
          <p className="text-lg text-slate-600">Revisa tus productos antes de finalizar la compra</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Carrito items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Header del carrito */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Productos Seleccionados</h2>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/30">
                    {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"}
                  </span>
                </div>
              </div>

              {/* Contenido del carrito */}
              <div className="p-8 max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                  {cartItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-12 h-12 text-slate-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-700 mb-4">Tu carrito está vacío</h3>
                      <p className="text-slate-500 mb-8">Agrega productos para continuar con tu compra</p>
                      <a
                        href="/catalogo"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <Package className="w-5 h-5" />
                        Explorar productos
                      </a>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="group flex items-center gap-6 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
                        >
                          {/* Imagen del producto */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
                              <img
                                src={`http://localhost:3000/uploads/${item.image}`}
                                alt={item.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          </div>

                          {/* Información del producto */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </h3>

                            {/* Controles de cantidad */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-600">Cantidad:</span>
                                <div className="flex items-center bg-white rounded-lg border border-slate-300 shadow-sm">
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                                    className="p-2 hover:bg-slate-50 transition-colors rounded-l-lg"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-4 h-4 text-slate-600" />
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    max={item.stock}
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const nuevaCantidad = Number.parseInt(e.target.value, 10)
                                      if (!isNaN(nuevaCantidad)) {
                                        handleQuantityChange(item.id, nuevaCantidad, item.stock)
                                      }
                                    }}
                                    className="w-16 px-3 py-2 text-center border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent font-semibold"
                                  />
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                                    className="p-2 hover:bg-slate-50 transition-colors rounded-r-lg"
                                    disabled={item.quantity >= item.stock}
                                  >
                                    <Plus className="w-4 h-4 text-slate-600" />
                                  </button>
                                </div>
                              </div>

                              {/* Stock disponible */}
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Package className="w-3 h-3" />
                                <span>{item.stock} disponibles</span>
                              </div>
                            </div>

                            {/* Precios */}
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                  ${(item.quantity * item.price).toLocaleString()}
                                </p>
                                <p className="text-sm text-slate-500">${item.price.toLocaleString()} c/u</p>
                              </div>

                              {/* Botón eliminar */}
                              <button
                                onClick={() => onRemove(item.id)}
                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group-hover:scale-110"
                                title="Eliminar producto"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
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
          <div className="h-fit">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 sticky top-8">
              {/* Header del resumen */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Resumen de Compra</h2>
                </div>
              </div>

              <div className="p-8">
                {/* Total animado */}
                <div className="text-center mb-8">
                  <p className="text-sm font-medium text-slate-600 mb-2">Total a pagar</p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 mb-4">
                    <p className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      ${displayTotal.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500">Incluye impuestos aplicables</p>
                </div>

                {/* Beneficios */}
                <div className="space-y-3 mb-8">
                
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Truck className="w-4 h-4 text-purple-500" />
                    <span>Entrega rápida</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Garantía incluida</span>
                  </div>
                </div>

                {/* Botón de checkout */}
                <div className="space-y-4">
                  <CheckoutButton />

                  {cartItems.length === 0 && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Agrega productos para continuar</span>
                    </div>
                  )}
                </div>

                {/* Información adicional */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center leading-relaxed">
                    Al proceder con la compra, aceptas nuestros términos y condiciones. Tu información está protegida
                    con encriptación SSL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  )
}
