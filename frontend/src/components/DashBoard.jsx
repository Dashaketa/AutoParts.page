"use client"

import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import Cart from "./dashboard/Cart"
import OrderHistory from "./dashboard/OrderHistory"
import api from "../services/api"
import { motion } from "framer-motion"
import { ShoppingCart, Package, Star, CheckCircle, Clock, CreditCard, Sparkles, Award, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)
  const { cartItems, total, updateQuantity, removeFromCart, clearCart } = useContext(CartContext)

  useEffect(() => {
    if (!usuario) navigate("/login")
  }, [usuario, navigate])

  const handleFinalize = async () => {
    if (!usuario) return navigate("/login")

    try {
      const token = localStorage.getItem("token")
      const payload = {
        usuario_id: usuario.id,
        items: cartItems.map((item) => ({
          producto_id: item.id,
          cantidad: item.quantity,
          precio_unitario: item.price,
        })),
      }

      const { data } = await api.post("/pedido/pedidos", payload, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })

      alert(`Pedido generado con ID ${data.pedidoId}`)
      clearCart()
    } catch (err) {
      console.error("Error al finalizar la compra:", err)
      alert("Error al finalizar la compra")
    }
  }

  if (!usuario) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header mejorado */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center"
          >
            {/* Badge de bienvenida */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-lg mb-6">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">Bienvenido de vuelta, {usuario.nombre}</span>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
              Mi Dashboard
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Administra tu carrito de compras y revisa tu historial de pedidos en un solo lugar
            </p>
          </motion.div>

          {/* Estadísticas rápidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {cartItems.length}
              </p>
              <p className="text-sm text-slate-500 font-medium">Productos en carrito</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/25">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${total.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500 font-medium">Total carrito</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
                <Package className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {usuario.rol === "clienteMayorista" ? "Mayorista" : "Cliente"}
              </p>
              <p className="text-sm text-slate-500 font-medium">Tipo de cuenta</p>
            </div>

          
          </motion.div>

          {/* Sección Carrito mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50"
          >
            {/* Header del carrito */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Carrito de Compras</h2>
                    <p className="text-blue-100 text-sm">
                      {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"} seleccionados
                    </p>
                  </div>
                </div>

                {/* Badge de estado */}
                <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Listo para comprar</span>
                </div>
              </div>
            </div>

            {/* Contenido del carrito */}
            <div className="p-8">
              <Cart
                cartItems={cartItems}
                total={total}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onFinalize={handleFinalize}
              />
            </div>
          </motion.div>

          {/* Sección Historial mejorada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50"
          >
            {/* Header del historial */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Historial de Pedidos</h2>
                    <p className="text-slate-300 text-sm">Revisa todos tus pedidos anteriores</p>
                  </div>
                </div>

                {/* Badge de actividad */}
                <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Actualizado</span>
                </div>
              </div>
            </div>

            {/* Contenido del historial */}
            <div className="p-8">
              <OrderHistory userId={usuario.id} />
            </div>
          </motion.div>

          {/* Sección de ayuda/soporte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden text-white p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda con tu pedido?</h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta sobre tus compras o
                productos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl border border-white/30 transition-all duration-300 hover:-translate-y-1">
                  📞 Contactar Soporte
                </button>
                <button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1">
                  💬 Chat en Vivo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
