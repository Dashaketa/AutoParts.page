// src/pages/PaymentFail.jsx
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentFail() {
  const navigate = useNavigate()
  const params = new URLSearchParams(useLocation().search)
  const code = params.get('code') || 'desconocido'

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Pago Rechazado</h1>
      <p className="mb-6">
        Lo sentimos, tu transacción fue rechazada. <br />
        Código de respuesta: <span className="font-semibold">{code}</span>
      </p>
      <button
        onClick={() => navigate('/catalogo')}
        className="bg-[#DD0426] text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Volver al Catálogo
      </button>
    </div>
  )
}
