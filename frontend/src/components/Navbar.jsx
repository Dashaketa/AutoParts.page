import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const { terminoBusqueda, setTerminoBusqueda } = useContext(SearchContext);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo / Nombre */}
          <Link to="/home" className="text-2xl font-bold text-[#273043]">
            AutoParts
          </Link>

          {/* Barra de búsqueda */}
          <div className="flex-1 mx-6 max-w-xs hidden md:block">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
            />
          </div>

          {/* Links de navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/catalogo"
              className={`text-gray-700 hover:text-[#1789FC] transition font-medium ${
                location.pathname === '/catalogo'
                  ? 'underline underline-offset-4 decoration-[#1789FC]'
                  : ''
              }`}
            >
              Catálogo
            </Link>
            {usuario && (
              <Link
                to="/dashboard"
                className={`text-gray-700 hover:text-[#1789FC] transition font-medium ${
                  location.pathname === '/dashboard'
                    ? 'underline underline-offset-4 decoration-[#1789FC]'
                    : ''
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Dropdown de usuario */}
          <div className="relative">
            <button
              onClick={() => setMostrarDropdown(!mostrarDropdown)}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
            >
              <img src="/svg/persona.svg" alt="Usuario" className="w-6 h-6" />
            </button>

            {mostrarDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                {usuario ? (
                  <div className="py-2">
                    <p className="px-4 py-2 text-gray-700">Hola, {usuario.nombre}</p>

                    <Link
                      to="/dashboard"
                      onClick={() => setMostrarDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Dashboard
                    </Link>

                    {usuario?.rol === 'admin' && (
                      <Link
                        to="/admin/pedidos"
                        onClick={() => setMostrarDropdown(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Panel Admin
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setMostrarDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[#DD0426] hover:bg-gray-100 transition"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link
                      to="/login"
                      onClick={() => setMostrarDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMostrarDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Espacio compensado para el navbar fijo */}
      <div className="h-16"></div>
    </>
  );
}
