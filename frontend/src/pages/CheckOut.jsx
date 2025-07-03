"use client"

import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import { MapPin, Phone, CreditCard, ShoppingCart, User, Shield, ArrowRight, Package, CheckCircle } from "lucide-react"

export default function Checkout() {
  const { cartItems, total, clearCart } = useContext(CartContext)
  const { usuario } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [direccion, setDireccion] = useState({
    calle: "",
    numero: "",
    comuna: "",
    ciudad: "",
    region: "",
    telefono: "",
  })

  const handleChange = (e) => {
    setDireccion((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!usuario) {
      alert("Debes iniciar sesión para continuar")
      navigate("/login")
      return
    }

    if (cartItems.length === 0) {
      alert("Tu carrito está vacío")
      navigate("/catalogo")
      return
    }

    const buyOrder = `O-${usuario.id}-${Date.now()}`

    try {
      // Guardar carrito temporal + dirección en backend
      await api.post(
        "/carrito-temporal",
        {
          buyOrder,
          usuario_id: usuario.id,
          items: cartItems,
          direccion,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )

      // Iniciar transacción Transbank con buyOrder
      const { data } = await api.post(
        "/api/transbank/init",
        {
          usuario_id: usuario.id,
          buyOrder,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )

      // Limpiar carrito local
      clearCart()

      // Redirigir a Webpay
      window.location.href = `${data.url}?token_ws=${data.token}`
    } catch (error) {
      console.error("Error en checkout:", error)
      alert("Error al procesar la compra. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Finalizar Compra
          </h1>
          <p className="text-lg text-slate-600">Completa tu información para procesar el pedido</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario de dirección */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
            >
              {/* Header del formulario */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Dirección de Envío</h2>
                    <p className="text-blue-100">Ingresa los datos para la entrega</p>
                  </div>
                </div>
              </div>

              {/* Campos del formulario */}
              <div className="p-8 space-y-6">
                {/* Información del usuario */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-semibold text-slate-800">Pedido para: {usuario?.nombre}</p>
                      <p className="text-sm text-slate-600">{usuario?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Grid de campos */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Calle *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        name="calle"
                        value={direccion.calle}
                        onChange={handleChange}
                        placeholder="Nombre de la calle"
                        required
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Número *</label>
                    <input
                      name="numero"
                      value={direccion.numero}
                      onChange={handleChange}
                      placeholder="Número"
                      required
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Comuna *</label>
                    <input
                      name="comuna"
                      value={direccion.comuna}
                      onChange={handleChange}
                      placeholder="Comuna"
                      required
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ciudad *</label>
                    <input
                      name="ciudad"
                      value={direccion.ciudad}
                      onChange={handleChange}
                      placeholder="Ciudad"
                      required
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Región *</label>
                    <input
                      name="region"
                      value={direccion.region}
                      onChange={handleChange}
                      placeholder="Región"
                      required
                      className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        name="telefono"
                        value={direccion.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                        required
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Información de seguridad */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">Compra Segura</h3>
                      <p className="text-sm text-green-700">
                        Tu información está protegida con encriptación SSL y será procesada de forma segura.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceder al Pago
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden sticky top-8">
              {/* Header del resumen */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Resumen del Pedido</h3>
                </div>
              </div>

              <div className="p-6">
                {/* Items del carrito */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                      <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-slate-500">
                          {item.quantity} × ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-800">
                          ${(item.quantity * item.price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-semibold text-slate-800">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-600">Envío:</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold text-slate-800 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Envío gratuito</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Garantía de calidad</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Pago 100% seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
