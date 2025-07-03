"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"
import Toast from "../ui/Toast"
import ConfirmModal from "../ui/ConfirmModal"
import {
  Package,
  Search,
  Plus,
  Edit3,
  Trash2,
  Tag,
  Grid3X3,
  DollarSign,
  Box,
  Sparkles,
  AlertTriangle,
  Loader2,
  PackageX,
  Warehouse,
  Eye,
  BarChart3,
} from "lucide-react"

export default function AdminProductos() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [brandFilter, setBrandFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/productos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProductos(res.data)
      } catch {
        setError("Error al cargar productos")
        showToast("Error al cargar productos", "error")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const brands = Array.from(new Set(productos.map((p) => p.marca))).filter(Boolean)
  const categories = Array.from(new Set(productos.map((p) => p.categoria))).filter(Boolean)

  const productosFiltrados = productos.filter((p) => {
    if (search && !p.nombre.toLowerCase().includes(search.toLowerCase())) return false
    if (brandFilter !== "all" && p.marca !== brandFilter) return false
    if (categoryFilter !== "all" && p.categoria !== categoryFilter) return false
    return true
  })

  const openDeleteModal = (id) => {
    setSelectedProductId(id)
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      await api.delete(`/productos/${selectedProductId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProductos(productos.filter((p) => p.id !== selectedProductId))
      showToast("Producto eliminado correctamente", "success")
    } catch {
      showToast("No se pudo eliminar el producto", "error")
    } finally {
      setIsModalOpen(false)
      setSelectedProductId(null)
    }
  }

  // Calcular estadísticas
  const stats = {
    total: productos.length,
    stockTotal: productos.reduce((sum, p) => sum + (p.stock || 0), 0),
    valorTotal: productos.reduce((sum, p) => sum + (p.precio || 0) * (p.stock || 0), 0),
    sinStock: productos.filter((p) => (p.stock || 0) === 0).length,
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: "text-red-600", bg: "bg-red-100", label: "Sin stock" }
    if (stock <= 5) return { color: "text-amber-600", bg: "bg-amber-100", label: "Stock bajo" }
    return { color: "text-green-600", bg: "bg-green-100", label: "En stock" }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Cargando Productos</h2>
          <p className="text-slate-600">Obteniendo inventario del sistema...</p>
          <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error al cargar</h2>
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header mejorado */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200/50 shadow-lg mb-6">
              <Package className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Gestión de Inventario</span>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
              Administración de Productos
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Gestiona tu inventario, precios y disponibilidad de productos
            </p>
          </motion.div>

          {/* Estadísticas del inventario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                <Package className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {stats.total}
              </p>
              <p className="text-sm text-slate-500 font-medium">Total productos</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/25">
                <Warehouse className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {stats.stockTotal}
              </p>
              <p className="text-sm text-slate-500 font-medium">Unidades en stock</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${stats.valorTotal.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500 font-medium">Valor total inventario</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-500/25">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                {stats.sinStock}
              </p>
              <p className="text-sm text-slate-500 font-medium">Sin stock</p>
            </div>
          </motion.div>

          {/* Toolbar mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                />
              </div>

              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="pl-12 pr-8 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[180px]"
                  >
                    <option value="all">Todas las Marcas</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Grid3X3 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="pl-12 pr-8 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[200px]"
                  >
                    <option value="all">Todas las Categorías</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botón nuevo producto */}
              <button
                onClick={() => navigate("/admin/productos/nuevo")}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-600/25 hover:shadow-green-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Plus className="w-5 h-5" />
                Nuevo Producto
              </button>
            </div>

            {/* Información de resultados */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">
                  {productosFiltrados.length} {productosFiltrados.length === 1 ? "producto" : "productos"} encontrados
                </span>
              </div>

              {(search || brandFilter !== "all" || categoryFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearch("")
                    setBrandFilter("all")
                    setCategoryFilter("all")
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </motion.div>

          {/* Grid de productos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {productosFiltrados.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-16 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PackageX className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">No hay productos que mostrar</h3>
                <p className="text-slate-500 mb-8">
                  {search || brandFilter !== "all" || categoryFilter !== "all"
                    ? "Intenta ajustar los filtros de búsqueda"
                    : "Comienza agregando tu primer producto al inventario"}
                </p>
                <button
                  onClick={() => navigate("/admin/productos/nuevo")}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Producto
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence>
                  {productosFiltrados.map((producto, index) => {
                    const stockStatus = getStockStatus(producto.stock)
                    return (
                      <motion.div
                        key={producto.id}
                        className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                      >
                        {/* Imagen del producto */}
                        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-6 h-48 flex items-center justify-center">
                          <img
                            src={`http://localhost:3000/uploads/${producto.imagen}`}
                            alt={producto.nombre}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />

                          {/* Badge de stock */}
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.bg} ${stockStatus.color}`}
                          >
                            {stockStatus.label}
                          </div>

                          {/* Overlay con acciones */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => navigate(`/producto/${producto.id}`)}
                              className="bg-white/90 backdrop-blur-sm text-slate-700 p-2 rounded-full hover:bg-white transition-all duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Información del producto */}
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {producto.nombre}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                                <Tag className="w-3 h-3" />
                                {producto.marca}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg">
                                <Grid3X3 className="w-3 h-3" />
                                {producto.categoria}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <Box className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-600">Stock: {producto.stock}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                  ${producto.precio.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => navigate(`/admin/productos/editar/${producto.id}`)}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
                              <Edit3 className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => openDeleteModal(producto.id)}
                              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="¿Eliminar producto?"
        message="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este producto?"
        confirmText="Sí, eliminar"
        type="danger"
      />

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  )
}
