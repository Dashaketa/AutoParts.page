"use client"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react" // Hooks nativos
import api from "../services/api"
import { Button } from "../components/ui/button"
import { Download, Printer, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function FacturaPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [factura, setFactura] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargarFactura = async () => {
      try {
        const response = await api.get(`pedido/pedidos/${id}/factura-detalle`)
        setFactura(response.data)
      } catch (err) {
        setError("Error al cargar la factura")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    cargarFactura()
  }, [id])

  const handleDescargar = () => {
    window.open(`/api/pedidos/${id}/factura`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" /> Volver
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Botón de volver */}
      <Button 
        onClick={() => navigate(-1)}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="mr-2" /> Volver
      </Button>

      {/* Contenedor de factura */}
      <div className="bg-white rounded-lg shadow-lg border p-8">
        {/* Encabezado */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">Taller de Manolo</h1>
            <p className="text-gray-600">Factura #{id}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Fecha: {new Date(factura.fecha_pedido).toLocaleDateString()}</p>
            <p className="text-gray-600">Estado: <span className="font-medium text-green-600">{factura.estado}</span></p>
          </div>
        </div>

        {/* Datos del cliente */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Cliente:</h2>
          <p>{factura.cliente}</p>
          <p>{factura.email}</p>
          <p>{factura.direccion}</p>
        </div>

        {/* Tabla de productos */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2">Producto</th>
                <th className="text-right pb-2">Precio</th>
                <th className="text-right pb-2">Cantidad</th>
                <th className="text-right pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {factura.items.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      {item.imagen && (
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.nombre}</p>
                        <p className="text-sm text-gray-600">{item.marca}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">${item.precio_unitario.toLocaleString()}</td>
                  <td className="text-right">{item.cantidad}</td>
                  <td className="text-right font-medium">
                    ${(item.precio_unitario * item.cantidad).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">${factura.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 mt-8">
          <Button 
            onClick={handleDescargar}
            variant="outline"
            className="gap-2"
          >
            <Download size={18} /> Descargar PDF
          </Button>
          <Button 
            onClick={() => window.print()}
            className="gap-2"
          >
            <Printer size={18} /> Imprimir
          </Button>
        </div>
      </div>
    </div>
  )
}