"use client"

import { useEffect, useState } from "react"
import api from "../../services/api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  Package,
  DollarSign,
  ShoppingCart,
  Loader2,
  AlertCircle,
  Truck,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Box,
  BarChart3,
  Users,
  Star,
  Sparkles,
  Target,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const [productos, setProductos] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [topProductos, setTopProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [metricas, setMetricas] = useState({
    productos: {
      total: 0,
      stockTotal: 0,
      valorNeto: 0,
      valorConIVA: 0,
      gananciaVenta: 0,
      gananciaMayorista: 0,
      margenPromedio: "0%",
    },
    pedidos: {
      total: 0,
      pendientes: 0,
      completados: 0,
      cancelados: 0,
      ingresosTotales: 0,
      promedioPedido: 0,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = localStorage.getItem("token")
        const headers = { headers: { Authorization: `Bearer ${token}` } }

        const [productosRes, pedidosRes, topProductosRes] = await Promise.all([
          api.get("/productos", headers),
          api.get("pedido/pedidos", headers),
          api.get("pedido/top-productos", headers),
        ])

        const productosData = productosRes.data || []
        const pedidosData = pedidosRes.data?.pedidos || []
        const topProductosData = topProductosRes.data?.slice(0, 5) || []

        setProductos(productosData)
        setPedidos(pedidosData)
        setTopProductos(topProductosData)

        // Función corregida para calcular métricas
        const calcularMetricas = () => {
          // 1. Métricas de productos - VERSIÓN MEJORADA
          const productosMetrics = productosData.reduce(
            (acc, p) => {
              const stock = Number(p.stock) || 0
              const precioCosto = Number(p.costo_precio) || 0
              const precioVenta = Number(p.precio) || 0
              const precioMayorista = Number(p.precio_mayorista) || precioVenta * 0.9 // Fallback: 10% descuento

              const gananciaVenta = (precioVenta - precioCosto) * stock
              const gananciaMayorista = (precioMayorista - precioCosto) * stock

              // Debug: Mostrar productos problemáticos
              if (gananciaMayorista < 0) {
                console.warn(`Producto con ganancia mayorista negativa:`, {
                  id: p.id,
                  nombre: p.nombre,
                  costo: precioCosto,
                  mayorista: precioMayorista,
                  stock: stock,
                })
              }

              return {
                total: acc.total + 1,
                stockTotal: acc.stockTotal + stock,
                valorNeto: acc.valorNeto + precioCosto * stock,
                valorConIVA: acc.valorConIVA + Math.round(precioVenta * 1.19) * stock,
                gananciaVenta: acc.gananciaVenta + Math.max(0, gananciaVenta),
                gananciaMayorista: acc.gananciaMayorista + Math.max(0, gananciaMayorista),
              }
            },
            {
              total: 0,
              stockTotal: 0,
              valorNeto: 0,
              valorConIVA: 0,
              gananciaVenta: 0,
              gananciaMayorista: 0,
            },
          )

          // 2. Métricas de pedidos (mantener la versión actual que ya está corregida)
          const pedidosMetrics = pedidosData.reduce(
            (acc, p) => {
              const totalPedido = Number(p.total) || 0
              const estado = String(p.estado).toLowerCase().trim()

              const nuevosAcc = { ...acc }
              nuevosAcc.total += 1

              if (estado.includes("pendiente")) {
                nuevosAcc.pendientes += 1
              } else if (estado.includes("completado") || estado.includes("completo")) {
                nuevosAcc.completados += 1
                nuevosAcc.ingresosTotales += totalPedido
              } else if (estado.includes("cancelado")) {
                nuevosAcc.cancelados += 1
              } else {
                nuevosAcc.pendientes += 1
              }

              return nuevosAcc
            },
            {
              total: 0,
              pendientes: 0,
              completados: 0,
              cancelados: 0,
              ingresosTotales: 0,
            },
          )

          return {
            productos: {
              ...productosMetrics,
              margenPromedio:
                productosMetrics.valorNeto > 0
                  ? ((productosMetrics.gananciaVenta / productosMetrics.valorNeto) * 100).toFixed(1) + "%"
                  : "0%",
              margenMayorista:
                productosMetrics.valorNeto > 0
                  ? ((productosMetrics.gananciaMayorista / productosMetrics.valorNeto) * 100).toFixed(1) + "%"
                  : "0%",
            },
            pedidos: {
              ...pedidosMetrics,
              promedioPedido:
                pedidosMetrics.completados > 0 ? pedidosMetrics.ingresosTotales / pedidosMetrics.completados : 0,
            },
          }
        }

        setMetricas(calcularMetricas())
      } catch (err) {
        console.error("Error:", err)
        setError(err.message || "Error al cargar datos")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Procesar datos para gráficos
  const procesarDatosGraficos = () => {
    // 1. Productos por categoría (horizontal bar chart)
    const categoriasMap = {}
    productos.forEach((p) => {
      const categoria = p.categoria || "Sin categoría"
      categoriasMap[categoria] = (categoriasMap[categoria] || 0) + 1
    })

    const categoriasData = Object.entries(categoriasMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)

    // 2. Estado de pedidos
    const statusMap = {}
    pedidos.forEach((p) => {
      const estado = p.estado?.toLowerCase() || "pendiente"
      statusMap[estado] = (statusMap[estado] || 0) + 1
    })

    const statusData = Object.entries(statusMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }))

    return { categoriasData, statusData }
  }

  const { categoriasData, statusData } = procesarDatosGraficos()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount)
  }

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Cargando Dashboard</h2>
          <p className="text-slate-600">Obteniendo datos del sistema...</p>
          <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error en el Dashboard</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            Reintentar
          </button>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge superior */}
      

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
            Dashboard Admin
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Monitorea el rendimiento de tu negocio con métricas en tiempo real
          </p>
        </motion.div>

        {/* Sección de Métricas mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Productos */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <Target className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Productos</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                {metricas.productos.total}
              </div>
              <p className="text-sm text-slate-500">{metricas.productos.stockTotal} unidades en stock</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-500 to-slate-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <Activity className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Valor Neto</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent mb-1">
                {formatCurrency(metricas.productos.valorNeto)}
              </div>
              <p className="text-sm text-slate-500">Inventario total</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <Award className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Ganancia Venta</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                {formatCurrency(metricas.productos.gananciaVenta)}
              </div>
              <p className="text-sm text-slate-500">Margen: {metricas.productos.margenPromedio}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <Users className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Ganancia Mayorista</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                {formatCurrency(metricas.productos.gananciaMayorista)}
              </div>
              <p className="text-sm text-slate-500">Canal mayorista</p>
            </div>
          </motion.div>

          {/* Pedidos */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <BarChart3 className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Pedidos</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">
                {metricas.pedidos.total}
              </div>
              <p className="text-sm text-slate-500">Todos los pedidos</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Completados</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">
                {metricas.pedidos.completados}
              </div>
              <p className="text-sm text-slate-500">{formatCurrency(metricas.pedidos.ingresosTotales)}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <Activity className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Pendientes</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-1">
                {metricas.pedidos.pendientes}
              </div>
              <p className="text-sm text-slate-500">En proceso</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <Award className="w-5 h-5 text-white/70" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Promedio por Pedido</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                {formatCurrency(metricas.pedidos.promedioPedido)}
              </div>
              <p className="text-sm text-slate-500">Ticket promedio</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Gráficos mejorados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Productos por categoría */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Productos por Categoría</h3>
              </div>
            </div>
            <div className="p-8">
              {categoriasData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={categoriasData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <Tooltip
                        formatter={(value) => [`${value} productos`, "Cantidad"]}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar dataKey="value" name="Productos" fill="url(#blueGradient)" radius={[0, 8, 8, 0]} />
                      <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No hay datos de categorías</p>
                </div>
              )}
            </div>
          </div>

          {/* Top 5 productos más vendidos */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Top 5 Productos Más Vendidos</h3>
              </div>
            </div>
            <div className="p-8">
              {topProductos.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProductos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                      <Tooltip
                        formatter={(value, name) =>
                          name === "Vendidos" ? [`${value} unidades`, "Cantidad"] : [value, "Unidades Vendidas"]
                        }
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="vendidos"
                        name="Unidades vendidas"
                        fill="url(#greenGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No hay datos de productos vendidos</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Últimos pedidos y Estado de pedidos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Últimos pedidos */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Últimos Pedidos</h3>
              </div>
            </div>
            <div className="p-8">
              {pedidos.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pedidos.slice(0, 5).map((pedido) => (
                        <tr key={pedido.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                            #{pedido.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                            {new Date(pedido.fecha_pedido).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                pedido.estado === "completado"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : pedido.estado === "pendiente"
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                    : "bg-red-100 text-red-700 border border-red-200"
                              }`}
                            >
                              {pedido.estado}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                            {formatCurrency(pedido.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No hay pedidos recientes</p>
                </div>
              )}
            </div>
          </div>

          {/* Estado de pedidos */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Estado de Pedidos</h3>
              </div>
            </div>
            <div className="p-8">
              {statusData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                      <Tooltip
                        formatter={(value) => [`${value} pedidos`, "Cantidad"]}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="value" name="Pedidos" fill="url(#orangeGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ea580c" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No hay datos de pedidos</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
