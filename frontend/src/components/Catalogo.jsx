// src/components/Catalogo.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { CartContext } from "../context/CartContext";

export default function Catalogo() {
  const { usuario } = useContext(AuthContext);
  const { terminoBusqueda } = useContext(SearchContext);
  const { addToCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  const manejarAgregar = (producto) => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: producto.precio,
      quantity: 1,
      image: producto.imagen,
    });
    alert("Producto agregado al carrito");
  };

  // Derivar listas únicas
  const brands = Array.from(new Set(productos.map((p) => p.marca))).filter(Boolean);
  const categories = Array.from(new Set(productos.map((p) => p.categoria))).filter(Boolean);

  // Filtrar productos
  const productosFiltrados = productos.filter((p) => {
    if (
      terminoBusqueda &&
      !p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    ) {
      return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.marca)) {
      return false;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(p.categoria)
    ) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <p className="text-center text-lg text-gray-700">Cargando productos...</p>;
  }
  if (error) {
    return <p className="text-center text-lg text-red-600">{error}</p>;
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold text-[#273043] mb-8">
          Catálogo de Productos
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filtros */}
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Marcas</h3>
              {brands.map((brand) => (
                <label key={brand} className="flex items-center mb-1 text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Categorías</h3>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center mb-1 text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </aside>

          {/* Grid de productos */}
          <main className="lg:col-span-3">
            {productosFiltrados.length === 0 ? (
              <p className="text-center text-lg text-gray-500">
                No se encontraron productos.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {productosFiltrados.map((producto) => (
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
                            ${producto.precio.toLocaleString()}
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
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
