"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { XCircle, AlertTriangle, RefreshCw, ArrowLeft, CreditCard, HelpCircle, Phone } from "lucide-react"

export default function PaymentFail() {
  const navigate = useNavigate()
  const params = new URLSearchParams(useLocation().search)
  const code = params.get("code") || "desconocido"

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      insufficient_funds: "Fondos insuficientes en tu cuenta",
      card_declined: "Tu tarjeta fue rechazada por el banco",
      expired_card: "Tu tarjeta ha expirado",
      invalid_cvc: "Código de seguridad incorrecto",
      processing_error: "Error en el procesamiento del pago",
      network_error: "Error de conexión",
      desconocido: "Error no identificado en la transacción",
    }
    return errorMessages[errorCode] || errorMessages.desconocido
  }

  const getSuggestions = (errorCode) => {
    const suggestions = {
      insufficient_funds: ["Verifica el saldo de tu cuenta", "Intenta con otra tarjeta"],
      card_declined: ["Contacta a tu banco", "Verifica los datos de tu tarjeta"],
      expired_card: ["Actualiza la fecha de vencimiento", "Usa una tarjeta vigente"],
      invalid_cvc: ["Verifica el código de seguridad", "Revisa los 3 dígitos del reverso"],
      processing_error: ["Intenta nuevamente en unos minutos", "Contacta soporte si persiste"],
      network_error: ["Verifica tu conexión a internet", "Intenta nuevamente"],
      desconocido: ["Intenta nuevamente", "Contacta soporte si el problema persiste"],
    }
    return suggestions[errorCode] || suggestions.desconocido
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-red-200/20 rounded-full blur-lg animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
          {/* Header con estado de error */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-12 text-center relative overflow-hidden">
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
                <XCircle className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">Pago Rechazado</h1>
                <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="px-8 py-12">
            {/* Información del error */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-orange-100 px-6 py-4 rounded-2xl border border-red-200 mb-6">
                <CreditCard className="w-6 h-6 text-red-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-red-700 mb-1">Código de error</p>
                  <p className="text-xl font-bold text-red-800">#{code}</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-3">{getErrorMessage(code)}</h2>
              <p className="text-slate-600">
                No te preocupes, esto puede suceder por varios motivos. Te ayudamos a solucionarlo.
              </p>
            </div>

            {/* Sugerencias */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 mb-8">
              <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                ¿Qué puedes hacer?
              </h3>
              <ul className="space-y-3">
                {getSuggestions(code).map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3 text-blue-700">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-800">{index + 1}</span>
                    </div>
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opciones de contacto */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800 mb-1 text-center">Reintentar</h3>
                <p className="text-xs text-green-600 text-center">Vuelve a intentar el pago</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800 mb-1 text-center">Soporte</h3>
                <p className="text-xs text-purple-600 text-center">Contacta nuestro equipo</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/catalogo")}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al catálogo
              </button>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <RefreshCw className="w-5 h-5" />
                Reintentar pago
              </button>
            </div>

            {/* Información de contacto */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5 text-purple-600" />
                ¿Necesitas ayuda?
              </h3>
              <div className="text-sm text-slate-600 text-center space-y-2">
                <p>Nuestro equipo de soporte está disponible para ayudarte</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                  <a
                    href="mailto:soporte@autoparts.com"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    📧 soporte@autoparts.com
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    📞 +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de tranquilidad */}
        <div className="text-center mt-8">
          <p className="text-slate-600 font-medium">No se realizó ningún cargo a tu cuenta 🔒</p>
        </div>
      </div>
    </div>
  )
}
