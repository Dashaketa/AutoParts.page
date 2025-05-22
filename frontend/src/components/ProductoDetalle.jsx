import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await api.get(`/productos/${id}`);
        setProducto(res.data);
      } catch {
        setError("No se pudo cargar el producto");
      }
    };
    fetchDetalle();
  }, [id]);

  const agregarAlCarrito = async () => {
    if (!usuario) {
      return navigate("/login");
    }
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/carrito/${usuario.id}/agregar`,
        { productoId: producto.id, cantidad: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Producto agregado al carrito");
    } catch {
      alert("Error al agregar producto");
    }
  };

  if (error)
    return (
      <p className="text-center py-10 text-red-600 font-medium">
        {error}
      </p>
    );
  if (!producto)
    return (
      <p className="text-center py-10 text-gray-700 font-medium">
        Cargando…
      </p>
    );

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Volver */}
        <button
          onClick={() => navigate("/catalogo")}
          className="inline-block mb-8 text-sm font-medium text-[#1789FC] hover:underline transition"
        >
          ← Volver al catálogo
        </button>

        {/* Detalle */}
        <div className="relative rounded-[calc(var(--radius-lg)+1px)] overflow-hidden">
          {/* Fondo “bento” */}
          <div className="absolute inset-px rounded-[calc(var(--radius-lg)+1px)] bg-white"></div>
          {/* Card contenido */}
          <div className="relative flex flex-col md:flex-row bg-white shadow ring-1 ring-black/5 hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Imagen */}
            <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
              <img
                src={`http://localhost:3000/uploads/${producto.imagen}`}
                alt={producto.nombre}
                className="max-h-96 object-contain"
              />
            </div>
            {/* Datos */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <h1 className="text-4xl font-bold text-[#273043] mb-4">
                {producto.nombre}
              </h1>
              <p className="text-gray-700 mb-6 flex-1">
                {producto.descripcion}
              </p>
              <p className="text-2xl font-semibold text-[#1789FC] mb-2">
                ${producto.precio.toLocaleString()}
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
