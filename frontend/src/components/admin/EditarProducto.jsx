// src/components/admin/EditarProducto.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const token = localStorage.getItem('token')
        const { data } = await api.get(`/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setForm({
          nombre: data.nombre,
          marca: data.marca,
          descripcion: data.descripcion,
          categoria: data.categoria,
          precio: data.precio,
          stock: data.stock,
          peso: data.peso,
          costo_precio: data.costo_precio
        })
      } catch {
        setError('Error al cargar producto')
      }
    })()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleFile = e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(form).forEach(([key, val]) => {
      data.append(key, val)
    })
    if (file) data.append('imagen', file)

    try {
      const token = localStorage.getItem('token')
      await api.put(`/productos/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Producto actualizado correctamente')
      navigate('/admin/productos')
    } catch {
      setError('Error al actualizar producto')
    }
  }

  if (!form) return <p className="text-center">Cargando...</p>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto #{id}</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="marca"
          value={form.marca}
          onChange={handleChange}
          placeholder="Marca"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          className="w-full border px-3 py-2 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio (venta)"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="costo_precio"
            type="number"
            value={form.costo_precio}
            onChange={handleChange}
            placeholder="Costo neto"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            name="peso"
            type="number"
            step="0.01"
            value={form.peso}
            onChange={handleChange}
            placeholder="Peso (kg)"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Nueva Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}
