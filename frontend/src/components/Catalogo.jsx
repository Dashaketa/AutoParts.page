"use client"

import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { AuthContext } from "../context/AuthContext"
import { SearchContext } from "../context/SearchContext"
import { CartContext } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus, X, AlertTriangle, Package, CheckCircle, Star, Tag, Grid3X3, Loader2 } from "lucide-react"

export default function Catalogo() {
  const { usuario } = useContext(AuthContext)
  const { terminoBusqueda, setTerminoBusqueda } = useContext(SearchContext)
  const { addToCart } = useContext(CartContext)
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get("/productos")
        setProductos(data)
      } catch {
        setError("Error al cargar productos")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const manejarAgregar = (producto) => {
    if (!usuario) {
      navigate("/login")
      return
    }

    const precioFinal = usuario?.rol === "clienteMayorista" ? producto.precio_mayorista : producto.precio_con_iva

    const carritoActual = JSON.parse(localStorage.getItem("cart")) || []
    const itemExistente = carritoActual.find((i) => i.id === producto.id)
    const cantidadEnCarrito = itemExistente ? itemExistente.quantity : 0

    if (cantidadEnCarrito + 1 > producto.stock) {
      alert("No hay suficiente stock disponible")
      return
    }

    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: precioFinal,
      quantity: 1,
      image: producto.imagen,
      stock: producto.stock,
    })

    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const brands = Array.from(new Set(productos.map((p) => p.marca))).filter(Boolean)
  const categories = Array.from(new Set(productos.map((p) => p.categoria))).filter(Boolean)

  const productosFiltrados = productos.filter((p) => {
    if (terminoBusqueda && !p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) return false
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.marca)) return false
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.categoria)) return false
    return true
  })

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-xl font-semibold text-slate-700 mb-2">Cargando catálogo...</p>
          <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-2">Error al cargar</p>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explora nuestra selección premium de repuestos automotrices
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de búsqueda */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-white shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 placeholder-slate-400 transition-all duration-300"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-800">Filtros</h2>
            </div>

            {/* Marcas */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Marcas
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto p-4">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center mb-3 text-base cursor-pointer transition-all duration-200 hover:bg-slate-50 rounded-lg px-3 py-2 group"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="text-slate-700 group-hover:text-slate-900 font-medium">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <Grid3X3 className="w-5 h-5" />
                  Categorías
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto p-4">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center mb-3 text-base cursor-pointer transition-all duration-200 hover:bg-slate-50 rounded-lg px-3 py-2 group"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="text-slate-700 group-hover:text-slate-900 font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botón Reset */}
            {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSelectedBrands([])
                  setSelectedCategories([])
                }}
                className="w-full py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </motion.aside>

          {/* Productos */}
          <motion.main
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-slate-600" />
                <h3 className="text-xl font-semibold text-slate-700">
                  {productosFiltrados.length}{" "}
                  {productosFiltrados.length === 1 ? "producto encontrado" : "productos encontrados"}
                </h3>
              </div>

              {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedBrands.map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                    >
                      {brand}
                      <button onClick={() => toggleBrand(brand)} className="hover:bg-blue-200 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedCategories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                    >
                      {cat}
                      <button onClick={() => toggleCategory(cat)} className="hover:bg-green-200 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {productosFiltrados.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">No se encontraron productos</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  Intenta ajustar tus filtros o términos de búsqueda para encontrar lo que necesitas.
                </p>
                <button
                  onClick={() => {
                    setTerminoBusqueda("")
                    setSelectedBrands([])
                    setSelectedCategories([])
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {productosFiltrados.map((producto) => {
                  const mostrarPrecio =
                    usuario?.rol === "clienteMayorista" ? producto.precio_mayorista : producto.precio_con_iva

                  return (
                    <motion.div
                      key={producto.id}
                      className="group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 group-hover:border-blue-200">
                        {/* Imagen */}
                        <div
                          onClick={() => navigate(`/producto/${producto.id}`)}
                          className="relative cursor-pointer overflow-hidden"
                        >
                          <div className="bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center h-56 relative">
                            <img
                              src={`http://localhost:3000/uploads/${producto.imagen}`}
                              alt={producto.nombre}
                              className="max-h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          {/* Badges */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            {usuario?.rol === "clienteMayorista" && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                <Star className="w-3 h-3" />
                                Mayorista
                              </span>
                            )}
                            {producto.stock <= 5 && producto.stock > 0 && (
                              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                Pocas unidades
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div
                            onClick={() => navigate(`/producto/${producto.id}`)}
                            className="flex-grow cursor-pointer"
                          >
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                              {producto.nombre}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">
                                <Tag className="w-3 h-3" />
                                {producto.marca}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                                <Grid3X3 className="w-3 h-3" />
                                {producto.categoria}
                              </span>
                            </div>

                            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{producto.descripcion}</p>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                            <div>
                              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                ${mostrarPrecio.toLocaleString()}
                              </span>
                              {usuario?.rol !== "clienteMayorista" && (
                                <p className="text-xs text-slate-500">IVA incluido</p>
                              )}
                            </div>

                            {producto.stock <= 0 ? (
                              <button
                                disabled
                                className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 cursor-not-allowed flex items-center justify-center"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  manejarAgregar(producto)
                                }}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.main>
        </div>
      </div>

      {/* Toast Notification */}
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
