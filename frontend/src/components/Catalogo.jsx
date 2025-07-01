import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Catalogo() {
  const { usuario } = useContext(AuthContext);
  const { terminoBusqueda, setTerminoBusqueda } = useContext(SearchContext);
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/productos");
        setProductos(data);
      } catch {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const manejarAgregar = (producto) => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    const precioFinal =
      usuario?.rol === "clienteMayorista"
        ? producto.precio_mayorista
        : producto.precio_con_iva;

        const carritoActual = JSON.parse(localStorage.getItem("cart")) || [];
const itemExistente = carritoActual.find((i) => i.id === producto.id);
const cantidadEnCarrito = itemExistente ? itemExistente.quantity : 0;

if (cantidadEnCarrito + 1 > producto.stock) {
  alert("No hay suficiente stock disponible");
  return;
}

    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: precioFinal,
      quantity: 1,
      image: producto.imagen,
      stock: producto.stock, // <--- IMPORTANTE


    });

    // Mostrar toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const brands = Array.from(new Set(productos.map((p) => p.marca))).filter(Boolean);
  const categories = Array.from(new Set(productos.map((p) => p.categoria))).filter(Boolean);

  const productosFiltrados = productos.filter((p) => {
    if (
      terminoBusqueda &&
      !p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    )
      return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.marca)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.categoria))
      return false;
    return true;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#1789FC]"></div>
      </div>
    );
  
  if (error) 
    return (
      <div className="text-center py-20">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 text-lg font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16 relative min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#1a2238] mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Catálogo de Productos
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Explora nuestra selección premium de repuestos automotrices
          </motion.p>
        </div>

        {/* Barra de búsqueda */}
        <motion.div 
          className="max-w-2xl mx-auto mb-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-0 bg-white shadow-lg focus:ring-2 focus:ring-[#1789FC] focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <motion.aside 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#1a2238] mb-4">Filtros</h2>

            {/* Marcas */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <h3 className="bg-gray-50 px-5 py-4 font-bold text-lg text-[#1a2238] border-b border-gray-200">
                Marcas
              </h3>
              <div className="max-h-64 overflow-y-auto p-4">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center mb-3 text-base cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:rounded-lg hover:px-3 hover:py-2"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-5 w-5 rounded border-gray-300 text-[#1789FC] focus:ring-[#1789FC]"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <h3 className="bg-gray-50 px-5 py-4 font-bold text-lg text-[#1a2238] border-b border-gray-200">
                Categorías
              </h3>
              <div className="max-h-64 overflow-y-auto p-4">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center mb-3 text-base cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:rounded-lg hover:px-3 hover:py-2"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-5 w-5 rounded border-gray-300 text-[#1789FC] focus:ring-[#1789FC]"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Botón Reset */}
            {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                }}
                className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-medium rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                Limpiar filtros
              </button>
            )}
          </motion.aside>

          {/* Productos */}
          <motion.main 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                {productosFiltrados.length} {productosFiltrados.length === 1 ? "producto encontrado" : "productos encontrados"}
              </h3>
              
              <div className="text-sm text-gray-500">
                {selectedBrands.length > 0 && (
                  <span className="mr-3">
                    Marcas: {selectedBrands.join(", ")}
                  </span>
                )}
                {selectedCategories.length > 0 && (
                  <span>
                    Categorías: {selectedCategories.join(", ")}
                  </span>
                )}
              </div>
            </div>

            {productosFiltrados.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-700 mt-4">No se encontraron productos</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Intenta ajustar tus filtros o términos de búsqueda para encontrar lo que necesitas.
                </p>
                <button 
                  onClick={() => {
                    setTerminoBusqueda("");
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                  }}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-[#1789FC] to-[#0d5ca8] text-white font-medium rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {productosFiltrados.map((producto) => {
                  const mostrarPrecio =
                    usuario?.rol === "clienteMayorista"
                      ? producto.precio_mayorista
                      : producto.precio_con_iva;

                  return (
                    <motion.div 
                      key={producto.id}
                      className="group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                        <div 
                          onClick={() => navigate(`/producto/${producto.id}`)}
                          className="relative cursor-pointer"
                        >
                          <div className="bg-gray-100 flex items-center justify-center h-56">
                            <img
                              src={`http://localhost:3000/uploads/${producto.imagen}`}
                              alt={producto.nombre}
                              className="max-h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          
                          <div className="absolute top-4 right-4">
                            {usuario?.rol === "clienteMayorista" && (
                              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Mayorista
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-5 flex flex-col grow">
                          <div 
                            onClick={() => navigate(`/producto/${producto.id}`)}
                            className="grow cursor-pointer"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1789FC] transition-colors">
                                {producto.nombre}
                              </h3>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2">
                                {producto.marca}
                              </span>
                              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {producto.categoria}
                              </span>
                            </div>
                            
                            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                              {producto.descripcion}
                            </p>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-lg font-bold text-[#1789FC]">
                                  ${mostrarPrecio.toLocaleString()}
                                </span>
                                {usuario?.rol !== "clienteMayorista" && (
                                  <p className="text-xs text-gray-500">
                                    IVA incluido
                                  </p>
                                )}
                              </div>
                              
                              {producto.stock <= 0 ? (
  <button
    disabled
    className="w-12 h-12 rounded-full bg-gray-300 text-white cursor-not-allowed"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
) : (
  <button
    onClick={(e) => {
      e.stopPropagation();
      manejarAgregar(producto);
    }}
    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#1789FC] to-[#0d5ca8] text-white shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  </button>
)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.main>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">¡Producto agregado al carrito!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}