// src/components/admin/AdminProductos.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminProductos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/productos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(res.data);
      } catch {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Derivar valores únicos
  const brands = Array.from(new Set(productos.map(p => p.marca))).filter(Boolean);
  const categories = Array.from(new Set(productos.map(p => p.categoria))).filter(Boolean);

  // Aplicar filtros
  const productosFiltrados = productos.filter(p => {
    if (search && !p.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    if (brandFilter !== 'all' && p.marca !== brandFilter) return false;
    if (categoryFilter !== 'all' && p.categoria !== categoryFilter) return false;
    return true;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(productos.filter(p => p.id !== id));
    } catch {
      alert('No se pudo eliminar el producto');
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#273043] mb-6 text-center">
          Administración de Productos
        </h1>

        {/* Toolbar de filtros */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          />

          <select
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          >
            <option value="all">Todas las Marcas</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            onClick={() => navigate('/admin/productos/nuevo')}
            className="bg-[#1789FC] hover:bg-[#273043] text-white font-medium px-6 py-2 rounded-lg transition"
          >
            + Nuevo Producto
          </button>
        </div>

        {/* Contenido */}
        {loading ? (
          <p className="text-center text-gray-600">Cargando productos...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : productosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos que mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map(producto => (
              <motion.div
                key={producto.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
                whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <img
                    src={`http://localhost:3000/uploads/${producto.imagen}`}
                    alt={producto.nombre}
                    className="w-full h-40 object-contain rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#273043] mb-1">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">Marca: {producto.marca}</p>
                  <p className="text-sm text-gray-600 mb-1">Categoria: {producto.categoria}</p>
                  <p className="text-sm text-gray-600 mb-1">Stock: {producto.stock}</p>
                  <p className="font-semibold text-[#1789FC] text-lg">
                    ${producto.precio.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/productos/editar/${producto.id}`)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
