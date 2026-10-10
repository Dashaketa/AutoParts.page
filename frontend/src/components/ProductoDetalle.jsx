"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingCart, Package, Star, Shield, Truck, CheckCircle } from "lucide-react"

export default function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const [producto, setProducto] = useState(null)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await api.get(`/productos/${id}`)
        setProducto({
          ...res.data,
          precio_con_iva: Math.round(res.data.precio * 1.19),
        })
      } catch {
        setError("No se pudo cargar el producto")
      }
    }
    fetchDetalle()
  }, [id])

  const agregarAlCarrito = () => {
    if (!usuario) {
      return navigate("/login")
    }

    const precioFinal = usuario?.rol === "clienteMayorista" ? producto.precio_mayorista : producto.precio_con_iva

    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: precioFinal,
      quantity: 1,
      image: producto.imagen,
    })

    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Error al cargar</p>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    )

  if (!producto)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Package className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xl font-semibold text-slate-700 mb-2">Cargando producto...</p>
          <div className="w-32 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )

  const mostrarPrecio = usuario?.rol === "clienteMayorista" ? producto.precio_mayorista : producto.precio_con_iva

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header con breadcrumb */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/catalogo")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver al catálogo
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Imagen del producto */}
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-8 lg:p-12 flex items-center justify-center min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <img
                src={`http://localhost:3000/uploads/${producto.imagen}`}
                alt={producto.nombre}
                className="relative z-10 max-h-96 w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-8 left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
            </div>

            {/* Información del producto */}
            <div className="p-8 lg:p-12 flex flex-col">
              {/* Badge de disponibilidad */}
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  En stock
                </span>
                {usuario?.rol === "clienteMayorista" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                    <Star className="w-4 h-4" />
                    Precio mayorista
                  </span>
                )}
              </div>

              {/* Título */}
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">{producto.nombre}</h1>

              {/* Descripción */}
              <p className="text-lg text-slate-600 mb-8 leading-relaxed flex-1">{producto.descripcion}</p>

              {/* Precio */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${mostrarPrecio.toLocaleString()}
                  </span>
                 
                </div>
                <p className="text-sm text-slate-500">
                  {usuario?.rol === "clienteMayorista" ? "Precio mayorista" : "Precio incluye IVA"}
                </p>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Package className="w-5 h-5 text-slate-600" />
                <span className="text-slate-700 font-medium">
                  Stock disponible: <span className="font-bold text-slate-800">{producto.stock}</span> unidades
                </span>
              </div>

              {/* Características adicionales */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Garantía incluida</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Envío disponible</span>
                </div>
              </div>

              {/* Botón de agregar al carrito */}
              <button
                onClick={agregarAlCarrito}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                Agregar al carrito
              </button>

              {/* Información adicional */}
              <p className="text-center text-sm text-slate-500 mt-4">
                {!usuario && "Inicia sesión para agregar productos al carrito"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification mejorado */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-green-400/20"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">¡Producto agregado!</p>
              <p className="text-sm text-green-100">Revisa tu carrito para continuar</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
