"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../../services/api"
import Toast from "../ui/Toast"
import {
  Package,
  ArrowLeft,
  Upload,
  DollarSign,
  Tag,
  Warehouse,
  Weight,
  FileText,
  Building,
  Save,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  ImageIcon,
  Calculator,
  Edit3,
  Loader2,
  RefreshCw,
  History,
} from "lucide-react"

export default function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [originalForm, setOriginalForm] = useState(null)
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const token = localStorage.getItem("token")
        const { data } = await api.get(`/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const formData = {
          nombre: data.nombre || "",
          marca: data.marca || "",
          descripcion: data.descripcion || "",
          categoria: data.categoria || "",
          precio: data.precio || "",
          stock: data.stock || "",
          peso: data.peso || "",
          costo_precio: data.costo_precio || "",
          precio_mayorista: data.precio_mayorista || "",
        }

        setForm(formData)
        setOriginalForm({ ...formData })
        setCurrentImage(data.imagen)
      } catch {
        setError("Error al cargar producto")
        showToast("Error al cargar producto", "error")
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Crear preview de la imagen
      const reader = new FileReader()
      reader.onload = (e) => {
        setFilePreview(e.target.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    const data = new FormData()
    Object.entries(form).forEach(([key, val]) => {
      data.append(key, val)
    })
    if (file) data.append("imagen", file)

    try {
      const token = localStorage.getItem("token")
      await api.put(`/productos/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      showToast("Producto actualizado correctamente", "success")
      setTimeout(() => navigate("/admin/productos"), 1500)
    } catch {
      setError("Error al actualizar producto")
      showToast("Error al actualizar producto", "error")
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setForm({ ...originalForm })
    setFile(null)
    setFilePreview(null)
    showToast("Formulario restaurado", "info")
  }

  // Verificar si hay cambios
  const hasChanges = () => {
    if (!originalForm) return false
    return JSON.stringify(form) !== JSON.stringify(originalForm) || file !== null
  }

  // Calcular margen de ganancia
  const calcularMargen = () => {
    const costo = Number.parseFloat(form?.costo_precio) || 0
    const precio = Number.parseFloat(form?.precio) || 0
    if (costo > 0 && precio > 0) {
      return (((precio - costo) / costo) * 100).toFixed(1)
    }
    return "0"
  }

  const calcularMargenMayorista = () => {
    const costo = Number.parseFloat(form?.costo_precio) || 0
    const precioMayorista = Number.parseFloat(form?.precio_mayorista) || 0
    if (costo > 0 && precioMayorista > 0) {
      return (((precioMayorista - costo) / costo) * 100).toFixed(1)
    }
    return "0"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Cargando Producto</h2>
          <p className="text-slate-600">Obteniendo información del producto...</p>
          <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Producto no encontrado</h2>
          <p className="text-slate-600 mb-6">No se pudo cargar la información del producto</p>
          <button
            onClick={() => navigate("/admin/productos")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            Volver a Productos
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
        <div className="max-w-4xl mx-auto">
          {/* Header con navegación */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/admin/productos")}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group mb-6"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Volver a Productos
            </button>

            <div className="text-center">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-lg mb-6">
                <Edit3 className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-700">Editar Producto</span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>

              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
                Editar Producto #{id}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Modifica la información del producto y guarda los cambios
              </p>
            </div>
          </motion.div>

          {/* Indicador de cambios */}
          {hasChanges() && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">Cambios sin guardar</p>
                    <p className="text-sm text-amber-700">Has realizado modificaciones en el producto</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 text-amber-700 font-medium rounded-xl border border-amber-200 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Deshacer
                </button>
              </div>
            </motion.div>
          )}

          {/* Formulario principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden"
          >
            {/* Header del formulario */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Información del Producto</h2>
                  <p className="text-blue-100 text-sm">Modifica los campos que necesites actualizar</p>
                </div>
              </div>
            </div>

            {/* Contenido del formulario */}
            <div className="p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Información básica */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Columna izquierda - Información del producto */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Información Básica
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Nombre del Producto *
                          </label>
                          <div className="relative">
                            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                              name="nombre"
                              value={form.nombre}
                              onChange={handleChange}
                              placeholder="Ej: Filtro de aceite Toyota"
                              className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Marca *</label>
                          <div className="relative">
                            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                              name="marca"
                              value={form.marca}
                              onChange={handleChange}
                              placeholder="Ej: Toyota, Bosch, NGK"
                              className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                              name="categoria"
                              value={form.categoria}
                              onChange={handleChange}
                              placeholder="Ej: Filtros, Frenos, Motor"
                              className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción *</label>
                          <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            placeholder="Describe las características y compatibilidad del producto..."
                            rows={4}
                            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha - Imagen */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-purple-600" />
                        Imagen del Producto
                      </h3>

                      <div className="space-y-4">
                        {/* Imagen actual */}
                        {currentImage && !filePreview && (
                          <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Imagen actual</p>
                            <img
                              src={`http://localhost:3000/uploads/${currentImage}`}
                              alt="Imagen actual"
                              className="max-h-48 mx-auto rounded-lg shadow-lg"
                            />
                          </div>
                        )}

                        {/* Nueva imagen o zona de subida */}
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                          {filePreview ? (
                            <div className="space-y-4">
                              <p className="text-sm font-semibold text-blue-700 mb-3">Nueva imagen</p>
                              <img
                                src={filePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded-lg shadow-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setFile(null)
                                  setFilePreview(null)
                                }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Cancelar cambio
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                <Upload className="w-8 h-8 text-slate-400" />
                              </div>
                              <div>
                                <p className="text-slate-600 font-medium mb-2">
                                  {currentImage ? "Cambiar imagen del producto" : "Subir imagen del producto"}
                                </p>
                                <p className="text-sm text-slate-500">PNG, JPG hasta 5MB</p>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFile}
                                className="hidden"
                                id="file-upload"
                              />
                              <label
                                htmlFor="file-upload"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                              >
                                <Upload className="w-4 h-4" />
                                {currentImage ? "Cambiar Imagen" : "Seleccionar Imagen"}
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precios y costos */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Precios y Costos
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Costo Neto * <span className="text-xs text-slate-500">(Sin IVA)</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          name="costo_precio"
                          type="number"
                          step="0.01"
                          value={form.costo_precio}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Precio de Venta *
                        {form.costo_precio && form.precio && (
                          <span className="text-xs text-green-600 ml-2">(Margen: {calcularMargen()}%)</span>
                        )}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          name="precio"
                          type="number"
                          step="0.01"
                          value={form.precio}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Precio Mayorista
                        {form.costo_precio && form.precio_mayorista && (
                          <span className="text-xs text-blue-600 ml-2">(Margen: {calcularMargenMayorista()}%)</span>
                        )}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          name="precio_mayorista"
                          type="number"
                          step="0.01"
                          value={form.precio_mayorista}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calculadora de márgenes */}
                  {form.costo_precio && (form.precio || form.precio_mayorista) && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Análisis de Márgenes</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {form.precio && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Ganancia venta:</span>
                            <span className="font-semibold text-green-600">
                              ${(Number.parseFloat(form.precio) - Number.parseFloat(form.costo_precio)).toFixed(0)}
                            </span>
                          </div>
                        )}
                        {form.precio_mayorista && (
                          <div className="flex justify-between">
                            <span className="text-slate-600">Ganancia mayorista:</span>
                            <span className="font-semibold text-blue-600">
                              $
                              {(
                                Number.parseFloat(form.precio_mayorista) - Number.parseFloat(form.costo_precio)
                              ).toFixed(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stock y peso */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Stock Actual *</label>
                    <div className="relative">
                      <Warehouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        name="stock"
                        type="number"
                        min="0"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Peso <span className="text-xs text-slate-500">(kg)</span>
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        name="peso"
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.peso}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/productos")}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Cancelar
                  </button>

                  {hasChanges() && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
                    >
                      <History className="w-5 h-5" />
                      Deshacer Cambios
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={saving || !hasChanges()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Guardar Cambios
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Información adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Consejos para editar productos</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Los cambios se guardan automáticamente al hacer clic en "Guardar Cambios"</li>
                  <li>• Puedes cambiar la imagen sin afectar otros campos</li>
                  <li>• Los márgenes se calculan automáticamente al modificar precios</li>
                  <li>• Usa "Deshacer Cambios" para restaurar los valores originales</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  )
}
