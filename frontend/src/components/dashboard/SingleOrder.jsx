// src/components/dashboard/SingleOrder.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

export default function SingleOrder() {
  const { orderId } = useParams();
  const [detalle, setDetalle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get(
          `/pedido/pedidos/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDetalle(data.detalle);
      } catch (err) {
        console.error('Error al cargar detalles:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  if (loading) return <p className="text-center">Cargando pedido...</p>;
  if (!detalle.length) return <p className="text-center text-red-600">Pedido no encontrado.</p>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Detalle del Pedido #{orderId}</h2>
      <div className="space-y-6">
        {detalle.map(item => (
          <div
            key={item.producto_id}
            className="flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-xl shadow"
          >
            <img
              src={`http://localhost:3000/uploads/${item.imagen}`}
              alt={item.nombre}
              className="w-full md:w-32 h-32 object-contain rounded-lg mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{item.nombre}</h3>
              <p className="text-sm text-gray-600 mb-1">Marca: {item.marca}</p>
              <p className="text-sm text-gray-600 mb-2">Descripción: {item.descripcion}</p>
              <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
            </div>
            <p className="mt-4 md:mt-0 font-semibold text-[#1789FC] text-lg">
              ${ (item.precio_unitario * item.cantidad).toLocaleString() }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
