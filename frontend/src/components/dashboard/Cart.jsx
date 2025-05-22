// src/components/dashboard/Cart.jsx
import React, { useEffect, useState } from 'react';
import CheckoutButton from './CheckoutButton'; // <-- importamos

export default function Cart({ cartItems, total, onUpdateQuantity, onRemove }) {
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = total;
    if (end === 0) {
      setDisplayTotal(0);
      return;
    }
    const duration = 600;
    const increment = Math.ceil(end / (duration / 20));
    const timer = setInterval(() => {
      start = Math.min(start + increment, end);
      setDisplayTotal(start);
      if (start === end) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {/* Carrito items */}
          <div className="relative lg:col-span-2 h-full">
            <div className="absolute inset-px rounded-2xl bg-white"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 p-6 flex flex-col space-y-6 h-full">
              <h2 className="text-2xl font-semibold text-[#273043]">Tu Carrito</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío.</p>
              ) : (
                <div className="grid gap-4 overflow-auto">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-xl shadow-sm overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <img
                          src={`http://localhost:3000/uploads/${item.image}`}
                          alt={item.name}
                          className="w-20 h-20 object-contain"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <div className="mt-2 flex items-center gap-2">
                            <label className="text-sm text-gray-600">Cant:</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                              className="w-16 text-center border rounded focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
                            />
                          </div>
                          <p className="mt-2 text-[#1789FC] font-semibold">
                            ${(item.quantity * item.price).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-red-500 hover:text-red-700 transform transition hover:scale-110 text-xl"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resumen + CheckoutButton */}
          <div className="relative h-full">
            <div className="absolute inset-px rounded-2xl bg-white"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 p-8 flex flex-col justify-between items-center space-y-6 h-full">
              <h3 className="text-xl font-semibold text-[#273043]">Resumen</h3>
              <p className="text-5xl font-bold text-[#1789FC]">${displayTotal.toLocaleString()}</p>
              <p className="text-sm text-gray-600 text-center">
                Total en tu carrito<br/>incluyendo impuestos
              </p>

              {/* Aquí reemplazamos el botón interno por tu componente de pago */}
              <CheckoutButton />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
