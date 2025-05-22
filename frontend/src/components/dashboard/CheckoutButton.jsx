// src/components/dashboard/CheckoutButton.jsx
import React, { useContext } from 'react'
import api from '../../services/api'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

export default function CheckoutButton() {
  const { cartItems } = useContext(CartContext)
  const { usuario }  = useContext(AuthContext)

  const handlePayment = async () => {
    if (!usuario) {
      alert('Debes iniciar sesión para pagar')
      return
    }

    try {
      // 1) Inicia la transacción en tu backend
      const { data } = await api.post(
        '/api/transbank/init',
        { usuario_id: usuario.id, items: cartItems },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )

      // 2) Guarda los items en sessionStorage para el callback
      sessionStorage.setItem(data.buyOrder, JSON.stringify(cartItems))

      // 3) Redirige a Webpay
      window.location.href = `${data.url}?token_ws=${data.token}`
    } catch (err) {
      // Si viene respuesta del servidor, la mostramos
      console.error('Transbank init error:', err.response || err);
      const msg = err.response?.data?.error || err.response?.data || err.message;
      alert(`Error al iniciar el pago: ${msg}`);
    }
  }

  const total = cartItems.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  )

  return (
    <button
      onClick={handlePayment}
      className="bg-[#1789FC] text-white px-4 py-2 rounded hover:bg-[#273043] transition"
    >
      Pagar ${total.toLocaleString()}
    </button>
  )
}
