import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  // Detectar click fuera para cerrar dropdown y carrito
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
      if (!cartRef.current?.contains(e.target)) setShowCart(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Estilo dinámico para link activo
  const navLinkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    backgroundColor: location.pathname === path ? "#1789FC" : "transparent",
    transition: "background 0.3s",
    fontWeight: "600",
  });

  return (
    <nav
      style={{
        display: "flex",
        padding: "1rem 2rem",
        backgroundColor: "#273043",
        color: "white",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 50,
      }}
    >
      {/* Logo y Nombre */}
      <Link to="/home" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/LogoAutoParts/Logo.svg" // Cambia esta ruta por tu logo real
          alt="AutoParts Logo"
          style={{ height: 40, width: 45, marginRight: 10, objectFit: "contain" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>
          AutoParts
        </span>
      </Link>

      {/* Navegación */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/home" style={navLinkStyle("/home")}>
          Home
        </Link>
        <Link to="/catalogo" style={navLinkStyle("/catalogo")}>
          Catálogo
        </Link>
        {usuario && (
          <Link to="/dashboard" style={navLinkStyle("/dashboard")}>
            Dashboard
          </Link>
        )}

        {/* Dropdown usuario */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            aria-haspopup="true"
            aria-expanded={showDropdown}
            aria-label="Menú usuario"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginLeft: 15,
            }}
          >
            <img
              src="/svg/persona.svg"
              alt="Usuario"
              style={{ width: 24, height: 24, filter: "invert(1)" }}
            />
          </button>
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                backgroundColor: "white",
                color: "#273043",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 100,
                minWidth: 180,
              }}
            >
              {usuario ? (
                <>
                  <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Bienvenido, {usuario.nombre}
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    style={{
                      backgroundColor: "#DD0426",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      width: "100%",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    textDecoration: "none",
                    color: "#1789FC",
                    display: "block",
                    fontWeight: "600",
                  }}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Carrito */}
        <div ref={cartRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowCart(!showCart)}
            aria-label="Mostrar carrito"
            style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              style={{ color: "white" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 7h13L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  background: "#DD0426",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: "999px",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Fondo oscuro para cerrar carrito */}
          {showCart && (
            <div
              onClick={() => setShowCart(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 99,
              }}
            />
          )}

          {/* Panel slide carrito */}
          {showCart && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: 320,
                height: "100vh",
                backgroundColor: "#EFF6EE",
                boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
                padding: "1.5rem",
                zIndex: 100,
                overflowY: "auto",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "#273043" }}>
                Tu carrito
              </h3>
              {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, color: "#273043" }}>
                  {cartItems.map((item, index) => (
                    <li key={index} style={{ marginBottom: "0.75rem" }}>
                      <strong>{item.name}</strong>
                      <br />
                      {item.quantity} x ${item.price.toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}
              <Link
                to="/dashboard"
                onClick={() => setShowCart(false)}
                style={{
                  display: "block",
                  marginTop: "2rem",
                  textAlign: "center",
                  backgroundColor: "#1789FC",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Ir al Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
