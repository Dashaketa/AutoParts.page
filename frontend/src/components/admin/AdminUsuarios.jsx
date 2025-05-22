// src/components/admin/AdminUsuarios.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'

export default function AdminUsuarios() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  // Carga inicial de usuarios
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/usuarios', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(res.data.usuarios || res.data) // adapta según respuesta backend
      } catch {
        setError('Error al cargar usuarios')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const roles = ['admin', 'cliente', 'clienteMayorista']

  // Filtrado por búsqueda y rol
  const filtered = users.filter(u => {
    if (roleFilter !== 'all' && u.rol !== roleFilter) return false
    if (search) {
      const s = search.toLowerCase()
      return (
        u.nombre.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s)
      )
    }
    return true
  })

  const handleRoleChange = async (id, newRole) => {
    try {
      const token = localStorage.getItem('token')
      await api.put(`/usuarios/${id}`, { rol: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.map(u => u.id === id ? { ...u, rol: newRole } : u))
    } catch {
      alert('No se pudo actualizar el rol')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return
    try {
      const token = localStorage.getItem('token')
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(users.filter(u => u.id !== id))
    } catch {
      alert('No se pudo eliminar el usuario')
    }
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#273043] mb-6 text-center">
          Administración de Usuarios
        </h1>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          />

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          >
            <option value="all">Todos los roles</option>
            {roles.map(r => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando usuarios...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No hay usuarios que mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(user => (
              <motion.div
                key={user.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#273043] mb-1">
                    {user.nombre} (#{user.id})
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    Creado: {new Date(user.fecha_creacion).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Rol:</label>
                    <select
                      value={user.rol}
                      onChange={e => handleRoleChange(user.id, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
                    >
                      {roles.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
                  >
                    Eliminar Usuario
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
