// src/pages/PaymentSuccess.jsx
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const params = new URLSearchParams(useLocation().search)
  const orderId = params.get('orderId')

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        ¡Pago Exitoso!
      </h1>
      <p className="mb-6">
        Tu pedido <span className="font-semibold">#{orderId}</span> ha sido creado correctamente.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-[#1789FC] text-white px-4 py-2 rounded hover:bg-[#273043] transition"
      >
        Ir al Dashboard
      </button>
    </div>
  )
}
