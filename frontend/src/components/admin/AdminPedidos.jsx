// src/components/admin/AdminPedidos.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminPedidos() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/pedido/pedidos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedidos(res.data.pedidos);
      } catch {
        setError('Error al obtener pedidos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPedidos = pedidos.filter((p) => {
    if (statusFilter !== 'all' && p.estado !== statusFilter) return false;
    if (search && !p.id.toString().includes(search.trim())) return false;
    return true;
  });

  const statusOptions = [
    { key: 'all', label: 'Todos' },
    { key: 'pendiente', label: 'Pendientes' },
    { key: 'completado', label: 'Completados' },
    { key: 'cancelado', label: 'Cancelados' },
  ];

  return (
    <div className="bg-[#EFF6EE] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#273043] mb-6 text-center">
          Administración de Pedidos
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          />
          <div className="flex gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setStatusFilter(opt.key)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === opt.key
                    ? 'bg-[#1789FC] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando pedidos...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : filteredPedidos.length === 0 ? (
          <p className="text-center text-gray-500">No hay pedidos que mostrar.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPedidos.map((pedido) => (
              <motion.div
                key={pedido.id}
                whileHover={{ scale: 1.02, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#273043] mb-1">
                    Pedido #{pedido.id}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Fecha: {new Date(pedido.fecha_pedido).toLocaleString()}
                  </p>
                  <p className="text-sm mb-1">
                    Estado:{' '}
                    <span
                      className={`font-medium ${
                        pedido.estado === 'pendiente'
                          ? 'text-yellow-600'
                          : pedido.estado === 'completado'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {pedido.estado}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Total:{' '}
                    <span className="font-semibold text-[#1789FC]">
                      ${pedido.total.toLocaleString()}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    className="flex-1 bg-[#1789FC] hover:bg-[#273043] text-white font-medium py-2 rounded-lg transition"
                    onClick={() => navigate(`/orders/${pedido.id}`)}
                  >
                    Ver Detalle
                  </button>
                  <button
                    className="flex-1 bg-[#DD0426] hover:bg-red-700 text-white font-medium py-2 rounded-lg transition"
                    onClick={() => alert('Función de cancelar pendiente')}
                  >
                    Cancelar
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
