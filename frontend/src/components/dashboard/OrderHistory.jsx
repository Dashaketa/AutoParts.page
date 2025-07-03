"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import {
  Package,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  XCircle,
  Eye,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from "lucide-react"

export default function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const token = localStorage.getItem("token")
        const { data } = await api.get(`/pedido/pedidos/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrders(data.pedidos)
      } catch (err) {
        console.error("Error al cargar historial de pedidos:", err)
      } finally {
        setLoading(false)
      }
    })()
  }, [userId])

  const getStatusColor = (status) => {
    const colors = {
      Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Procesando: "bg-blue-100 text-blue-800 border-blue-200",
      Enviado: "bg-purple-100 text-purple-800 border-purple-200",
      Entregado: "bg-green-100 text-green-800 border-green-200",
      Cancelado: "bg-red-100 text-red-800 border-red-200",
    }
    return colors[status] || colors.Pendiente
  }

  const getStatusIcon = (status) => {
    const icons = {
      Pendiente: <Clock className="w-4 h-4" />,
      Procesando: <Package className="w-4 h-4" />,
      Enviado: <Truck className="w-4 h-4" />,
      Entregado: <CheckCircle className="w-4 h-4" />,
      Cancelado: <XCircle className="w-4 h-4" />,
    }
    return icons[status] || icons.Pendiente
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Hace 1 día"
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`
    return `Hace ${Math.ceil(diffDays / 30)} meses`
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <p className="text-xl font-semibold text-slate-700 mb-2">Cargando historial...</p>
            <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-4">No tienes pedidos aún</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Cuando realices tu primera compra, aparecerá aquí tu historial de pedidos.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Package className="w-5 h-5" />
              Explorar productos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Historial de Pedidos
          </h2>
          <p className="text-lg text-slate-600">Revisa todos tus pedidos y su estado actual</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
            <p className="text-sm text-slate-500">Total pedidos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {orders.filter((order) => order.estado === "Entregado").length}
            </p>
            <p className="text-sm text-slate-500">Entregados</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {orders.filter((order) => order.estado === "Enviado").length}
            </p>
            <p className="text-sm text-slate-500">En tránsito</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">
              ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </p>
            <p className="text-sm text-slate-500">Total gastado</p>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Header del pedido */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Pedido #{order.id}
                  </h3>
                  <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Contenido del pedido */}
              <div className="p-6 space-y-4">
                {/* Estado */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                      order.estado,
                    )}`}
                  >
                    {getStatusIcon(order.estado)}
                    {order.estado}
                  </span>
                  <span className="text-xs text-slate-500">{getTimeAgo(order.fecha_pedido)}</span>
                </div>

                {/* Fecha */}
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(order.fecha_pedido)}</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-sm text-slate-500">Total del pedido</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${order.total.toLocaleString()}
                  </span>
                </div>

                {/* Indicador de hover */}
                <div className="flex items-center justify-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    Ver detalles
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mensaje de ayuda */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">¿Necesitas ayuda?</h3>
            <p className="text-slate-600 mb-6">
              Si tienes alguna pregunta sobre tus pedidos o necesitas soporte, estamos aquí para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:soporte@autoparts.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                📧 Contactar Soporte
              </a>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
              >
                <Package className="w-4 h-4" />
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
