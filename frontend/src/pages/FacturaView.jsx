"use client"
import { useNavigate, useParams } from "react-router-dom"

const FacturaView = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data for the invoice
  const factura = {
    id: id,
    cliente: "John Doe",
    fecha: "2024-01-20",
    estado: "Pagada",
    metodo_pago: "Tarjeta de Crédito",
    items: [
      { id: 1, nombre: "Producto A", marca: "Marca X", cantidad: 2, precio_unitario: 25000 },
      { id: 2, nombre: "Producto B", marca: "Marca Y", cantidad: 1, precio_unitario: 50000 },
    ],
    total: 109500,
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Botón volver fuera de la factura */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"
        >
          ← Volver
        </button>

        {/* Factura container - simula papel */}
        <div className="bg-white shadow-2xl border border-gray-200">
          {/* Header de la factura */}
          <div className="border-b-2 border-black p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">FACTURA ELECTRÓNICA</h1>
                <p className="text-sm text-gray-600">Documento Tributario Electrónico</p>
              </div>
              <div className="text-right">
                <div className="border-2 border-black p-4 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-700 mb-1">N° FACTURA</p>
                  <p className="text-2xl font-bold text-black">{factura.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información principal */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Datos del cliente */}
              <div>
                <h3 className="text-sm font-bold text-black mb-4 border-b border-gray-300 pb-2">DATOS DEL CLIENTE</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-600 block">CLIENTE:</span>
                    <span className="text-base font-medium text-black">{factura.cliente}</span>
                  </div>
                </div>
              </div>

              {/* Datos de la factura */}
              <div>
                <h3 className="text-sm font-bold text-black mb-4 border-b border-gray-300 pb-2">DATOS DE LA FACTURA</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-600 block">FECHA DE EMISIÓN:</span>
                    <span className="text-base font-medium text-black">
                      {new Date(factura.fecha).toLocaleDateString("es-CL")}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-600 block">ESTADO:</span>
                    <span
                      className={`text-base font-bold ${
                        factura.estado.toLowerCase().includes("pagad")
                          ? "text-green-700"
                          : factura.estado.toLowerCase().includes("pendiente")
                            ? "text-yellow-700"
                            : "text-red-700"
                      }`}
                    >
                      {factura.estado.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-600 block">MÉTODO DE PAGO:</span>
                    <span className="text-base font-medium text-black">{factura.metodo_pago || "No especificado"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de productos */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-black mb-4 border-b border-gray-300 pb-2">DETALLE DE PRODUCTOS</h3>
              <div className="border border-gray-300">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-300">
                      <th className="text-left py-3 px-4 text-xs font-bold text-black">PRODUCTO</th>
                      <th className="text-left py-3 px-4 text-xs font-bold text-black">MARCA</th>
                      <th className="text-center py-3 px-4 text-xs font-bold text-black">CANT.</th>
                      <th className="text-right py-3 px-4 text-xs font-bold text-black">PRECIO UNIT.</th>
                      <th className="text-right py-3 px-4 text-xs font-bold text-black">SUBTOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factura.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="py-3 px-4 text-sm text-black font-medium">{item.nombre}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{item.marca}</td>
                        <td className="py-3 px-4 text-sm text-black text-center font-mono">{item.cantidad}</td>
                        <td className="py-3 px-4 text-sm text-black text-right font-mono">
                          ${Number.parseFloat(item.precio_unitario).toLocaleString("es-CL")}
                        </td>
                        <td className="py-3 px-4 text-sm text-black text-right font-mono font-semibold">
                          ${(item.cantidad * Number.parseFloat(item.precio_unitario)).toLocaleString("es-CL")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totales */}
            <div className="flex justify-end">
              <div className="w-80">
                <div className="border-2 border-black bg-gray-50 p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-black">SUBTOTAL:</span>
                      <span className="text-base font-mono text-black">
                        ${(factura.total / 1.19).toLocaleString("es-CL", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-black">IVA (19%):</span>
                      <span className="text-base font-mono text-black">
                        ${(factura.total - factura.total / 1.19).toLocaleString("es-CL", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="border-t-2 border-black pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-black">TOTAL:</span>
                        <span className="text-2xl font-bold font-mono text-black">
                          ${factura.total.toLocaleString("es-CL")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer de la factura */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2">
                  Este documento es una representación impresa de una Factura Electrónica
                </p>
                <p className="text-xs text-gray-500">
                  Fecha de impresión: {new Date().toLocaleDateString("es-CL")} -{" "}
                  {new Date().toLocaleTimeString("es-CL")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción fuera de la factura */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-colors font-medium"
          >
            Imprimir Factura
          </button>
          <button className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors font-medium">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default FacturaView
