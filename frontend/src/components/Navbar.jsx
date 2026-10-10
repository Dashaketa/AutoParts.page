"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import { User, ShoppingCart, X, Package } from "lucide-react"

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext)
  const { cartItems } = useContext(CartContext)
  const location = useLocation()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const dropdownRef = useRef(null)
  const cartRef = useRef(null)
  const { clearCart } = useContext(CartContext)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false)
      if (!cartRef.current?.contains(e.target)) setShowCart(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActivePath = (path) => location.pathname === path

  return (
    <nav className="flex px-6 lg:px-10 py-4 bg-slate-800 text-white justify-between items-center relative z-50 shadow-xl border-b border-slate-700">
      {/* Logo */}
      <Link to="/home" className="flex items-center group transition-transform hover:scale-105">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-full p-2 mr-3 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
          <img src="/LogoAutoParts/Logo.svg" alt="AutoParts Logo" className="h-9 w-9 object-contain" />
        </div>
        <span className="font-black text-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight">
          AutoParts
        </span>
      </Link>

      {/* Enlaces principales */}
      <div className="hidden md:flex gap-2 items-center">
        <Link
          to="/home"
          className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
            isActivePath("/home")
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-300 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          Home
        </Link>

        <Link
          to="/catalogo"
          className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
            isActivePath("/catalogo")
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "text-slate-300 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          Catálogo
        </Link>

        {usuario && (
          <Link
            to="/dashboard"
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              isActivePath("/dashboard")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            Pedidos
          </Link>
        )}

        {usuario?.rol === "admin" && (
          <Link
            to="/admin/pedidos"
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              isActivePath("/admin/pedidos")
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            Panel Admin
          </Link>
        )}
      </div>

      {/* Controles de usuario y carrito */}
      <div className="flex items-center gap-3">
        {/* Dropdown Usuario */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center ${
              showDropdown ? "bg-white/20 scale-110" : "hover:bg-white/10"
            }`}
          >
            <User className="w-6 h-6 text-white" />
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-white text-slate-800 p-6 rounded-2xl shadow-2xl z-50 min-w-[280px] border border-slate-200 animate-in slide-in-from-top-2 duration-200">
              {usuario ? (
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-200">
                    <p className="font-bold text-lg text-slate-800 mb-1">Bienvenido, {usuario.nombre}</p>
                    <p className="text-sm text-slate-500">Panel de usuario</p>
                  </div>

                  <button
                    onClick={() => {
                      clearCart()
                      logout()
                      setShowDropdown(false)
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setShowDropdown(false)}
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                  >
                    Iniciar Sesión
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setShowDropdown(false)}
                    className="block w-full bg-slate-100 hover:bg-slate-200 text-blue-600 py-3 px-4 rounded-xl font-semibold text-center transition-all duration-200 border border-slate-200"
                  >
                    Registrarse
                  </Link>

                  <Link
                    to="http://localhost:4000/login"
                    onClick={() => setShowDropdown(false)}
                    className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                  >
                    AutoParts Mayorista
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Carrito */}
        <div ref={cartRef} className="relative">
          <button
            onClick={() => setShowCart(!showCart)}
            className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center relative ${
              showCart ? "bg-white/20 scale-110" : "hover:bg-white/10"
            }`}
          >
            <ShoppingCart className="w-6 h-6 text-white" />

            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[22px] text-center shadow-lg animate-pulse">
                {cartItems.length}
              </span>
            )}
          </button>

          {showCart && (
            <>
              {/* Backdrop */}
              <div
                onClick={() => setShowCart(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
              />

              {/* Cart Sidebar */}
              <div className="fixed top-0 right-0 w-96 max-w-[90vw] h-full bg-white shadow-2xl p-6 z-50 overflow-y-auto flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    Tu carrito
                  </h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-500" />
                  </button>
                </div>

                {/* Cart Content */}
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-slate-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-slate-600 mb-2">Tu carrito está vacío</p>
                      <p className="text-slate-500">Agrega productos para continuar</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4 mb-6">
                      {cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 text-lg mb-1">{item.name}</h4>
                            <p className="text-slate-500 text-sm">
                              {item.quantity} × ${item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-xl text-slate-800">
                              ${(item.quantity * item.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl mb-6 border border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-700">Subtotal:</span>
                        <span className="text-2xl font-bold text-slate-800">
                          ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Action Button */}
                <Link
                  to="/dashboard"
                  onClick={() => setShowCart(false)}
                  className="block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  {cartItems.length > 0 ? "Finalizar compra" : "Explorar productos"}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
