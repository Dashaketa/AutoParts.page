import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await api.get(`/productos/${id}`);
        setProducto({
          ...res.data,
          precio_con_iva: Math.round(res.data.precio * 1.19),
        });
      } catch {
        setError("No se pudo cargar el producto");
      }
    };
    fetchDetalle();
  }, [id]);

  const agregarAlCarrito = () => {
    if (!usuario) {
      return navigate("/login");
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

    alert("Producto agregado al carrito");
  };

  if (error)
    return <p className="text-center py-10 text-red-600 font-medium">{error}</p>;
  if (!producto)
    return <p className="text-center py-10 text-gray-700 font-medium">Cargando…</p>;

  const mostrarPrecio =
    usuario?.rol === "clienteMayorista"
      ? producto.precio_mayorista
      : producto.precio_con_iva;

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <button
          onClick={() => navigate("/catalogo")}
          className="inline-block mb-8 text-sm font-medium text-[#1789FC] hover:underline transition"
        >
          ← Volver al catálogo
        </button>

        <div className="relative rounded-[calc(var(--radius-lg)+1px)] overflow-hidden">
          <div className="absolute inset-px rounded-[calc(var(--radius-lg)+1px)] bg-white"></div>
          <div className="relative flex flex-col md:flex-row bg-white shadow ring-1 ring-black/5 hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
              <img
                src={`http://localhost:3000/uploads/${producto.imagen}`}
                alt={producto.nombre}
                className="max-h-96 object-contain"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col">
              <h1 className="text-4xl font-bold text-[#273043] mb-4">
                {producto.nombre}
              </h1>
              <p className="text-gray-700 mb-6 flex-1">{producto.descripcion}</p>
              <p className="text-2xl font-semibold text-[#1789FC] mb-2">
                ${mostrarPrecio.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Stock disponible: {producto.stock}
              </p>
              <button
                onClick={agregarAlCarrito}
                className="mt-auto w-full bg-[#1789FC] hover:bg-[#273043] text-white font-medium py-3 rounded-lg transition"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
