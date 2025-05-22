// src/components/Dashboard.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Cart from './dashboard/Cart';
import OrderHistory from './dashboard/OrderHistory'
import api from "../services/api";


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
    <>
    <div>

      <h1 className="text-4xl font-semibold text-[#273043] mb-12 text-center">
        Bienvenido, {usuario.nombre}
      </h1>
      <Cart
        cartItems={cartItems}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onFinalize={handleFinalize}
      />
    </div>
      <OrderHistory userId={usuario.id} />
    </>
  );
}
