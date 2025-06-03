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
  const { clearCart } = useContext(CartContext); 


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
      if (!cartRef.current?.contains(e.target)) setShowCart(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "0.5rem",
    backgroundColor: location.pathname === path ? "#1789FC" : "transparent",
    transition: "all 0.3s ease",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: location.pathname === path ? "#1470db" : "rgba(255,255,255,0.1)"
    }
  });

  return (
    <nav
      style={{
        display: "flex",
        padding: "1rem 2.5rem",
        backgroundColor: "#1a2238",
        color: "white",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 50,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <Link 
        to="/home" 
        style={{ 
          display: "flex", 
          alignItems: "center",
          textDecoration: "none"
        }}
      >
        <div style={{
          background: "linear-gradient(135deg, #1789FC 0%, #0d5ca8 100%)",
          borderRadius: "50%",
          padding: "8px",
          marginRight: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img
            src="/LogoAutoParts/Logo.svg"
            alt="AutoParts Logo"
            style={{ height: 36, width: 36, objectFit: "contain" }}
          />
        </div>
        <span style={{ 
          fontWeight: "800", 
          fontSize: "1.6rem", 
          color: "white",
          letterSpacing: "-0.5px",
          background: "linear-gradient(to right, #fff, #c2e3ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          AutoParts
        </span>
      </Link>

      {/* Enlaces principales */}
      <div style={{ 
        display: "flex", 
        gap: "0.8rem", 
        alignItems: "center" 
      }}>
        <Link to="/home" style={navLinkStyle("/home")}>Home</Link>
        <Link to="/catalogo" style={navLinkStyle("/catalogo")}>Catálogo</Link>

        {usuario && (
          <Link to="/dashboard" style={navLinkStyle("/dashboard")}>Dashboard</Link>
        )}

        {usuario?.rol === "admin" && (
          <Link to="/admin/pedidos" style={navLinkStyle("/admin/pedidos")}>Panel Admin</Link>
        )}

        {/* Dropdown Usuario */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ 
              background: showDropdown ? "rgba(255,255,255,0.2)" : "transparent", 
              border: "none", 
              cursor: "pointer", 
              padding: "8px",
              borderRadius: "50%",
              transition: "background 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src="/svg/persona.svg"
              alt="Usuario"
              style={{ 
                width: 26, 
                height: 26, 
                filter: "invert(1)",
                transition: "transform 0.3s",
                transform: showDropdown ? "scale(1.1)" : "scale(1)"
              }}
            />
          </button>
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                backgroundColor: "#fff",
                color: "#273043",
                padding: "1.2rem",
                borderRadius: "0.8rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 100,
                minWidth: "220px",
                border: "1px solid #f0f4f8",
                animation: "fadeIn 0.2s ease-out"
              }}
            >
              {usuario ? (
                <>
                  <p style={{ 
                    fontWeight: "700", 
                    marginBottom: "1rem",
                    fontSize: "1.05rem",
                    color: "#1a2238"
                  }}>
                    Bienvenido, {usuario.nombre}
                  </p>
                  <button
                    onClick={() => {
                      clearCart(); 
                      logout();
                      setShowDropdown(false);
                    }}
                    style={{
                      background: "linear-gradient(to right, #DD0426, #b80220)",
                      color: "white",
                      padding: "0.7rem",
                      borderRadius: "0.5rem",
                      width: "100%",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 8px rgba(221, 4, 38, 0.2)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 12px rgba(221, 4, 38, 0.25)"
                      }
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <Link
                    to="/login"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      textDecoration: "none",
                      background: "linear-gradient(to right, #1789FC, #0d5ca8)",
                      color: "white",
                      padding: "0.7rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      textAlign: "center",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 8px rgba(23, 137, 252, 0.2)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 12px rgba(23, 137, 252, 0.25)"
                      }
                    }}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#f0f4f8",
                      color: "#1789FC",
                      padding: "0.7rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      textAlign: "center",
                      transition: "all 0.2s",
                      border: "1px solid #e1e8f0",
                      "&:hover": {
                        backgroundColor: "#e4edfc"
                      }
                    }}
                  >
                    Registrarse
                  </Link>
                  <Link
                    to="http://localhost:4000/login"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#f0f4f8",
                      color: "#1789FC",
                      padding: "0.7rem 1rem",
                      borderRadius: "0.5rem",
                      fontWeight: "600",
                      textAlign: "center",
                      transition: "all 0.2s",
                      border: "1px solid #e1e8f0",
                      "&:hover": {
                        backgroundColor: "#e4edfc"
                      }
                    }}
                  >
                    AutoParts Mayorista
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Carrito */}
        <div ref={cartRef} style={{ position: "relative" }}>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{ 
              background: showCart ? "rgba(255,255,255,0.2)" : "transparent", 
              border: "none", 
              cursor: "pointer", 
              position: "relative",
              padding: "8px",
              borderRadius: "50%",
              transition: "background 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="26"
              height="26"
              style={{ 
                color: "white",
                transition: "transform 0.3s",
                transform: showCart ? "scale(1.1)" : "scale(1)"
              }}
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
                  top: -2,
                  right: -2,
                  background: "linear-gradient(to right, #DD0426, #b80220)",
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  padding: "3px 7px",
                  borderRadius: "999px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  minWidth: "22px",
                  textAlign: "center"
                }}
              >
                {cartItems.length}
              </span>
            )}
          </button>

          {showCart && (
            <>
              <div
                onClick={() => setShowCart(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 99,
                  backdropFilter: "blur(2px)",
                  animation: "fadeIn 0.3s ease-out"
                }}
              />
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "380px",
                  maxWidth: "90vw",
                  height: "100vh",
                  backgroundColor: "#ffffff",
                  boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
                  padding: "1.8rem",
                  zIndex: 100,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  animation: "slideIn 0.3s ease-out"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #f0f4f8"
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    color: "#1a2238", 
                    fontSize: "1.4rem",
                    fontWeight: "700"
                  }}>
                    Tu carrito
                  </h3>
                  <button 
                    onClick={() => setShowCart(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.8rem",
                      color: "#94a3b8",
                      padding: "0 0.5rem",
                      transition: "color 0.2s",
                      "&:hover": {
                        color: "#64748b"
                      }
                    }}
                  >
                    &times;
                  </button>
                </div>
                
                {cartItems.length === 0 ? (
                  <div style={{ 
                    flex: 1, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "#64748b"
                  }}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="64" 
                      height="64" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      style={{ marginBottom: "1rem" }}
                    >
                      <path 
                        stroke="#cbd5e1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301C4.378 9 6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154.9 1.154.472 2.87-.386 6.301-.567 2.268-.85 3.402-1.79 4.043-.94.64-2.202.64-4.728.64h-4.63c-2.526 0-3.789 0-4.728-.64-.94-.641-1.223-1.775-1.79-4.043z" 
                      />
                      <path 
                        stroke="#cbd5e1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0016.96 4.04c-.38-.28-.882-.418-1.886-.692L12.5 2.5M7.5 6l2-4" 
                      />
                    </svg>
                    <p style={{ fontSize: "1.1rem" }}>Tu carrito está vacío</p>
                    <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>Agrega productos para continuar</p>
                  </div>
                ) : (
                  <>
                    <ul style={{ 
                      listStyle: "none", 
                      padding: 0, 
                      color: "#334155",
                      flex: 1,
                      marginBottom: "1.5rem"
                    }}>
                      {cartItems.map((item, index) => (
                        <li 
                          key={index} 
                          style={{ 
                            padding: "1rem 0",
                            borderBottom: "1px solid #f1f5f9",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <div>
                            <strong style={{ color: "#1e293b", fontSize: "1.05rem" }}>{item.name}</strong>
                            <p style={{ 
                              color: "#64748b", 
                              margin: "0.3rem 0 0",
                              fontSize: "0.9rem"
                            }}>
                              {item.quantity} × ${item.price.toLocaleString()}
                            </p>
                          </div>
                          <span style={{ 
                            fontWeight: "700", 
                            color: "#1a2238",
                            fontSize: "1.1rem"
                          }}>
                            ${(item.quantity * item.price).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div style={{ 
                      padding: "1.2rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "0.8rem",
                      marginBottom: "1.5rem"
                    }}>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        marginBottom: "0.8rem"
                      }}>
                        <span style={{ color: "#475569" }}>Subtotal:</span>
                        <span style={{ color: "#1a2238" }}>
                          ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        fontWeight: "600",
                        fontSize: "1.1rem"
                      }}>
                        
                      </div>
                    </div>
                  </>
                )}
                
                <Link
                  to="/dashboard"
                  onClick={() => setShowCart(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "linear-gradient(to right, #1789FC, #0d5ca8)",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "0.6rem",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "1.05rem",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 10px rgba(23, 137, 252, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 15px rgba(23, 137, 252, 0.4)"
                    }
                  }}
                >
                  {cartItems.length > 0 ? "Finalizar compra" : "Explorar productos"}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}