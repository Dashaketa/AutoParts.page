//src/pages/CheckOut.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState({
    calle: '',
    numero: '',
    comuna: '',
    ciudad: '',
    region: '',
    telefono: '',
  });

  const handleChange = (e) => {
    setDireccion(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert('Debes iniciar sesión para continuar');
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      navigate('/catalogo');
      return;
    }

    const buyOrder = `O-${usuario.id}-${Date.now()}`;

    try {
      // Guardar carrito temporal + dirección en backend
      await api.post('/carrito-temporal', {
        buyOrder,
        usuario_id: usuario.id,
        items: cartItems,
        direccion,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Iniciar transacción Transbank con buyOrder
      const { data } = await api.post('/api/transbank/init', {
        usuario_id: usuario.id,
        buyOrder,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Limpiar carrito local
      clearCart();

      // Redirigir a Webpay
      window.location.href = `${data.url}?token_ws=${data.token}`;

    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Error al procesar la compra. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#273043]">Dirección de envío</h2>

      <input
        name="calle"
        value={direccion.calle}
        onChange={handleChange}
        placeholder="Calle"
        required
        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
      />
      <input
        name="numero"
        value={direccion.numero}
        onChange={handleChange}
        placeholder="Número"
        required
        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
      />
      <input
        name="comuna"
        value={direccion.comuna}
        onChange={handleChange}
        placeholder="Comuna"
        required
        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
      />
      <input
        name="ciudad"
        value={direccion.ciudad}
        onChange={handleChange}
        placeholder="Ciudad"
        required
        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
      />
      <input
        name="region"
        value={direccion.region}
        onChange={handleChange}
        placeholder="Región"
        required
        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
      />
      <input
        name="telefono"
        value={direccion.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        required
        className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
      />

      <button
        type="submit"
        className="w-full bg-[#1789FC] hover:bg-[#273043] text-white font-semibold py-3 rounded transition"
      >
        Finalizar compra
      </button>
    </form>
  );
}
