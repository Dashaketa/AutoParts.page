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

    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: precioFinal,
      quantity: 1,
      image: producto.imagen,
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
      <p className="text-center text-lg text-gray-700">Cargando productos...</p>
    );
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="bg-gray-50 py-12 sm:py-16 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold text-[#273043] mb-4">
          Catálogo de Productos
        </h2>

        {/* Barra de búsqueda */}
        <div className="max-w-xs mx-auto mb-8">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1789FC]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <aside className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Filtros</h2>

            {/* Marcas */}
            <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg p-4">
              <h3
                className="sticky top-0 bg-white px-3 py-2 mb-3 font-semibold text-gray-700 shadow-sm rounded-t-lg z-10"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                Marcas
              </h3>
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center mb-2 text-sm cursor-pointer hover:text-[#1789FC] transition"
                >
                  <input
                    type="checkbox"
                    className="mr-3 rounded border-gray-300 focus:ring-[#1789FC]"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>

            {/* Categorías */}
            <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg p-4">
              <h3
                className="sticky top-0 bg-white px-3 py-2 mb-3 font-semibold text-gray-700 shadow-sm rounded-t-lg z-10"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                Categorías
              </h3>
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center mb-2 text-sm cursor-pointer hover:text-[#1789FC] transition"
                >
                  <input
                    type="checkbox"
                    className="mr-3 rounded border-gray-300 focus:ring-[#1789FC]"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </aside>

          {/* Productos */}
          <main className="lg:col-span-3">
            {productosFiltrados.length === 0 ? (
              <p className="text-center text-lg text-gray-500">
                No se encontraron productos.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {productosFiltrados.map((producto) => {
                  const mostrarPrecio =
                    usuario?.rol === "clienteMayorista"
                      ? producto.precio_mayorista
                      : producto.precio_con_iva;

                  return (
                    <div key={producto.id} className="relative">
                      <div className="absolute inset-px rounded-lg bg-white"></div>
                      <div className="relative flex h-full flex-col overflow-hidden rounded shadow ring-1 ring-black/5 hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <div
                          onClick={() => navigate(`/producto/${producto.id}`)}
                          className="px-5 pt-5"
                        >
                          <img
                            src={`http://localhost:3000/uploads/${producto.imagen}`}
                            alt={producto.nombre}
                            className="w-full h-48 object-contain"
                          />
                        </div>
                        <div className="px-5 pb-5 flex flex-col grow">
                          <h3
                            onClick={() => navigate(`/producto/${producto.id}`)}
                            className="mt-2 text-lg font-medium text-gray-950"
                          >
                            {producto.nombre}
                          </h3>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {producto.descripcion}
                          </p>
                          <p className="mt-2 text-sm text-gray-600">
                            <strong>Marca:</strong> {producto.marca}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            <strong>Categoría:</strong> {producto.categoria}
                          </p>
                          <div className="mt-auto">
                            <p className="text-[#1789FC] font-semibold text-lg mb-4">
                              ${mostrarPrecio.toLocaleString()}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                manejarAgregar(producto);
                              }}
                              className="w-full bg-[#1789FC] hover:bg-[#273043] text-white font-medium py-2 rounded-lg transition"
                            >
                              Agregar al carrito
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-[#1789FC] text-white px-4 py-3 rounded-lg shadow-lg z-50"
          >
            ¡Producto agregado al carrito!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
