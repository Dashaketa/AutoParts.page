// src/components/Dashboard.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Cart from './dashboard/Cart';
import OrderHistory from './dashboard/OrderHistory';
import api from "../services/api";
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const { cartItems, total, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  useEffect(() => {
    if (!usuario) navigate('/login');
  }, [usuario, navigate]);

  const handleFinalize = async () => {
    if (!usuario) return navigate('/login');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        usuario_id: usuario.id,
        items: cartItems.map(item => ({
          producto_id: item.id,
          cantidad: item.quantity,
          precio_unitario: item.price,
        })),
      };
      const { data } = await api.post('/pedido/pedidos', payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      alert(`Pedido generado con ID ${data.pedidoId}`);
      clearCart();
    } catch (err) {
      console.error('Error al finalizar la compra:', err);
      alert('Error al finalizar la compra');
    }
  };

  if (!usuario) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Encabezado */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Mi Cuenta
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Administra tu carrito de compras y revisa tu historial de pedidos
          </p>
        </motion.div>

        {/* Sección Carrito - Ocupa todo el ancho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-[#1789FC] to-[#0d5ca8] px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Carrito de Compras</h2>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>
          <div className="p-6">
            <Cart
              cartItems={cartItems}
              total={total}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onFinalize={handleFinalize}
            />
          </div>
        </motion.div>

        {/* Sección Historial de Pedidos - Ocupa todo el ancho debajo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Historial de Pedidos</h2>
          </div>
          <div className="p-6">
            <OrderHistory userId={usuario.id} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}