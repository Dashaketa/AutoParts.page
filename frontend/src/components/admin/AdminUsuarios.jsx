"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import api from "../../services/api"
import Toast from "../ui/Toast"
import ModalConfirm from "../ui/ModalConfirm"
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Crown,
  Building,
  User,
  Mail,
  Calendar,
  Trash2,
  Edit3,
  Shield,
  Star,
  Sparkles,
  AlertTriangle,
  Loader2,
} from "lucide-react"

export default function AdminUsuarios() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [toast, setToast] = useState({ show: false, message: "", type: "success" })
  const [confirmData, setConfirmData] = useState({ show: false, userId: null })

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000)
  }

  // Carga inicial de usuarios
  useEffect(() => {
    ;(async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await api.get("/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUsers(res.data.usuarios || res.data) // adapta según respuesta backend
      } catch {
        setError("Error al cargar usuarios")
        showToast("Error al cargar usuarios", "error")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const roles = ["admin", "cliente", "clienteMayorista"]

  // Filtrado por búsqueda y rol
  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.rol !== roleFilter) return false
    if (search) {
      const s = search.toLowerCase()
      return u.nombre.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
    }
    return true
  })

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token")
      await api.put(
        `/usuarios/${id}`,
        { rol: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setUsers(users.map((u) => (u.id === id ? { ...u, rol: newRole } : u)))
      showToast("Rol actualizado correctamente", "success")
    } catch {
      showToast("No se pudo actualizar el rol", "error")
    }
  }

  const handleDelete = async (id) => {
    setConfirmData({
      show: true,
      userId: id,
    })
  }

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      await api.delete(`/usuarios/${confirmData.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(users.filter((u) => u.id !== confirmData.userId))
      showToast("Usuario eliminado correctamente")
    } catch {
      showToast("Error al eliminar el usuario", "error")
    } finally {
      setConfirmData({ show: false, userId: null })
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />
      case "clienteMayorista":
        return <Building className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      case "clienteMayorista":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
      default:
        return "bg-gradient-to-r from-slate-500 to-slate-600 text-white"
    }
  }

  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "clienteMayorista":
        return "Cliente Mayorista"
      case "cliente":
        return "Cliente"
      default:
        return role
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Cargando Usuarios</h2>
          <p className="text-slate-600">Obteniendo información del sistema...</p>
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
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-lg mb-6">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700">Gestión de Usuarios</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
              Administración de Usuarios
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Gestiona roles, permisos y información de todos los usuarios del sistema
            </p>
          </motion.div>

          {/* Estadísticas rápidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {users.length}
              </p>
              <p className="text-sm text-slate-500 font-medium">Total usuarios</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/25">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {users.filter((u) => u.rol === "admin").length}
              </p>
              <p className="text-sm text-slate-500 font-medium">Administradores</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-400/25">
                <Building className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                {users.filter((u) => u.rol === "clienteMayorista").length}
              </p>
              <p className="text-sm text-slate-500 font-medium">Mayoristas</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-slate-500/25">
                <User className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
                {users.filter((u) => u.rol === "cliente").length}
              </p>
              <p className="text-sm text-slate-500 font-medium">Clientes</p>
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
                  placeholder="Buscar por nombre o email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                />
              </div>

              {/* Filtro de rol */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-12 pr-8 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white min-w-[200px]"
                >
                  <option value="all">Todos los roles</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {getRoleName(r)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Información de resultados */}
              <div className="flex items-center gap-2 text-slate-600">
                <UserCheck className="w-5 h-5" />
                <span className="font-medium">
                  {filtered.length} {filtered.length === 1 ? "usuario" : "usuarios"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Lista de usuarios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-16 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserX className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">No hay usuarios que mostrar</h3>
                <p className="text-slate-500 mb-8">
                  {search || roleFilter !== "all"
                    ? "Intenta ajustar los filtros de búsqueda"
                    : "No se encontraron usuarios en el sistema"}
                </p>
                {(search || roleFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearch("")
                      setRoleFilter("all")
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence>
                  {filtered.map((user, index) => (
                    <motion.div
                      key={user.id}
                      className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Header del usuario */}
                      <div className={`${getRoleColor(user.rol)} px-6 py-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              {getRoleIcon(user.rol)}
                            </div>
                            <div>
                              <h3 className="font-bold text-white">#{user.id}</h3>
                              <p className="text-xs text-white/80">{getRoleName(user.rol)}</p>
                            </div>
                          </div>
                          <Star className="w-5 h-5 text-white/70" />
                        </div>
                      </div>

                      {/* Contenido del usuario */}
                      <div className="p-6">
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                            {user.nombre}
                          </h3>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className="w-4 h-4" />
                              <span className="text-sm truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(user.fecha_creacion).toLocaleDateString("es-ES", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Controles */}
                        <div className="space-y-4">
                          {/* Selector de rol */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Cambiar rol:</label>
                            <div className="relative">
                              <Edit3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                              <select
                                value={user.rol}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                              >
                                {roles.map((r) => (
                                  <option key={r} value={r}>
                                    {getRoleName(r)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Botón eliminar */}
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar Usuario
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
      <ModalConfirm
        show={confirmData.show}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmData({ show: false, userId: null })}
      />
    </div>
  )
}
