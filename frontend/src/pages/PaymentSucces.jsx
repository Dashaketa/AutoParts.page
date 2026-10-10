"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Package, ArrowRight, Sparkles, Gift, FileText } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const orderId = params.get("orderId");

  const [facturaId, setFacturaId] = useState(null);

  useEffect(() => {
    const generarFactura = async () => {
      try {
        const res = await fetch(`http://localhost:3000/pedido/facturas/crear/${orderId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ metodo_pago: "transferencia" }) // Ajusta método pago si quieres
        });

        if (!res.ok) throw new Error("Error al crear factura");

        const data = await res.json();
        setFacturaId(data.facturaId);
      } catch (error) {
        console.error("Error al crear la factura:", error);
      }
    };

    if (orderId) {
      generarFactura();
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-yellow-200/30 rounded-full blur-lg animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
          {/* Header con animación */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center relative overflow-hidden">
            {/* Elementos decorativos del header */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-8 w-8 h-8 border-2 border-white/30 rounded-full animate-ping"></div>
              <div className="absolute top-8 right-12 w-6 h-6 border-2 border-white/20 rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-6 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-500"></div>
              <div className="absolute bottom-8 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-700"></div>
            </div>

            {/* Icono principal */}
            <div className="relative z-10 mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                <CheckCircle className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-white animate-spin" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  ¡Pago Exitoso!
                </h1>
                <Sparkles className="w-6 h-6 text-white animate-spin" />
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="px-8 py-12 text-center">
            {/* Información del pedido */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-4 rounded-2xl border border-green-200 mb-6">
                <Package className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Número de pedido
                  </p>
                  <p className="text-xl font-bold text-green-800">#{orderId}</p>
                </div>
              </div>

              <p className="text-lg text-slate-600 mb-2">
                Tu pedido ha sido creado correctamente y está siendo procesado.
              </p>
              <p className="text-sm text-slate-500">
                Recibirás un email de confirmación con todos los detalles.
              </p>
            </div>

            {/* Características adicionales */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1">
                  Pago Confirmado
                </h3>
                <p className="text-xs text-blue-600">Transacción segura</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800 mb-1">
                  En Proceso
                </h3>
                <p className="text-xs text-purple-600">Preparando envío</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-amber-800 mb-1">Garantía</h3>
                <p className="text-xs text-amber-600">Productos protegidos</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Package className="w-5 h-5" />
                Ver mis pedidos
                <ArrowRight className="w-5 h-5" />
              </button>

              {facturaId && (
             <button
             onClick={() => navigate(`/factura/${facturaId}`)}
             className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-600/25 hover:shadow-green-600/40 transition-all duration-300 hover:-translate-y-1"
           >
             <FileText className="w-5 h-5" />
             Ver Factura
           </button>
              )}

              <button
                onClick={() => navigate("/catalogo")}
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1"
              >
                Seguir comprando
              </button>
            </div>

            {/* Información adicional */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                ¿Qué sigue?
              </h3>
              <div className="text-sm text-slate-600 space-y-2">
                <p>
                  • Recibirás un email de confirmación en los próximos minutos
                </p>
                <p>• Te notificaremos cuando tu pedido esté listo para envío</p>
                <p>• Puedes rastrear el estado en tu dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="text-center mt-8">
          <p className="text-slate-600 font-medium">
            ¡Gracias por confiar en AutoParts! 🚗✨
          </p>
        </div>
      </div>
    </div>
  );
}
