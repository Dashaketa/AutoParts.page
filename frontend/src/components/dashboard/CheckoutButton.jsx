import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CheckoutButton() {
  const { cartItems } = useContext(CartContext)
  const { usuario } = useContext(AuthContext)
  const navigate = useNavigate()

  const handlePayment = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para pagar')
      return
    }
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío')
      return
    }

    navigate('/checkout')
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
