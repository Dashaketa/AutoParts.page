// src/components/dashboard/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get(
          `/pedido/pedidos/usuario/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setOrders(data.pedidos);
      } catch (err) {
        console.error('Error al cargar historial de pedidos:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  if (loading) {
    return <p className="text-center">Cargando historial de pedidos...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center text-gray-500">No tienes pedidos previos.</p>;
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[#273043] mb-6">
          Historial de Pedidos
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-medium text-gray-900">
                Pedido #{order.id}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Fecha: {new Date(order.fecha_pedido).toLocaleDateString()}
              </p>
              <p className="mt-2 text-sm">
                Estado: <span className="font-semibold">{order.estado}</span>
              </p>
              <p className="mt-2 font-semibold text-[#1789FC]">
                Total: ${order.total.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
