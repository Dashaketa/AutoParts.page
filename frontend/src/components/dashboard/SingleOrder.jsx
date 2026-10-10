"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../services/api"
import {
  ArrowLeft,
  Package,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Tag,
  Hash,
  Loader2,
} from "lucide-react"

export default function SingleOrder() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [detalle, setDetalle] = useState([])
  const [orderInfo, setOrderInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const token = localStorage.getItem("token")
        const { data } = await api.get(`/pedido/pedidos/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setDetalle(data.detalle)
        // Si tienes información adicional del pedido, la puedes obtener aquí
        setOrderInfo({
          id: orderId,
          fecha: new Date().toLocaleDateString(),
          estado: "Procesando",
          total: data.detalle.reduce((sum, item) => sum + item.precio_unitario * item.cantidad, 0),
        })
      } catch (err) {
        console.error("Error al cargar detalles:", err)
      } finally {
        setLoading(false)
      }
    })()
  }, [orderId])

  const getStatusColor = (status) => {
    const colors = {
      Procesando: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Enviado: "bg-blue-100 text-blue-800 border-blue-200",
      Entregado: "bg-green-100 text-green-800 border-green-200",
      Cancelado: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[status] || colors.Procesando
  }

  const getStatusIcon = (status) => {
    const icons = {
      Procesando: <Clock className="w-4 h-4" />,
      Enviado: <Truck className="w-4 h-4" />,
      Entregado: <CheckCircle className="w-4 h-4" />,
      Cancelado: <AlertCircle className="w-4 h-4" />,
    }
    return icons[status] || icons.Procesando
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-xl font-semibold text-slate-700 mb-2">Cargando pedido...</p>
          <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )

  if (!detalle.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Pedido no encontrado</p>
          <p className="text-slate-600 mb-6">No pudimos encontrar el pedido solicitado</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con navegación */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver al Dashboard
          </button>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                  <Hash className="w-8 h-8 text-blue-600" />
                  Pedido {orderId}
                </h1>
                <p className="text-slate-600">Detalles completos de tu pedido</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-center sm:text-right">
                  <p className="text-sm text-slate-500 mb-1">Estado del pedido</p>
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                      orderInfo?.estado,
                    )}`}
                  >
                    {getStatusIcon(orderInfo?.estado)}
                    {orderInfo?.estado}
                  </span>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-slate-500 mb-1">Total del pedido</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${orderInfo?.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información del pedido */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Fecha del pedido</p>
                <p className="font-semibold text-slate-800">{orderInfo?.fecha}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Método de pago</p>
                <p className="font-semibold text-slate-800">Webpay</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Envío</p>
                <p className="font-semibold text-slate-800">Estándar</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Productos</p>
                <p className="font-semibold text-slate-800">{detalle.length} items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Productos del pedido */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Package className="w-6 h-6" />
              Productos del Pedido
            </h2>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {detalle.map((item, index) => (
                <div
                  key={item.producto_id}
                  className="flex flex-col lg:flex-row items-start lg:items-center bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Imagen del producto */}
                  <div className="w-full lg:w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 shadow-sm">
                    <img
                      src={`http://localhost:3000/uploads/${item.imagen}`}
                      alt={item.nombre}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-slate-800">{item.nombre}</h3>

                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        <Tag className="w-3 h-3" />
                        {item.marca}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        <Package className="w-3 h-3" />
                        Cantidad: {item.cantidad}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{item.descripcion}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Precio unitario</p>
                          <p className="font-semibold text-slate-800">${item.precio_unitario.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Cantidad</p>
                          <p className="font-semibold text-slate-800">{item.cantidad}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-slate-500 mb-1">Subtotal</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                          ${(item.precio_unitario * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total final */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Total del Pedido</h3>
                    <p className="text-sm text-slate-600">Incluye todos los productos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      ${orderInfo?.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones adicionales */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Ver todos mis pedidos
          </button>
          <button
            onClick={() => navigate("/catalogo")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  )
}
