"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import InfoGrid from "../components/home/InfoGrid"
import InfoGrid2 from "../components/home/InfoGrid2"
import InfoGrid3 from "../components/home/InfoGrid3"
import Carrusel from "../components/home/Carrusel"
import { ChevronDown, Sparkles, Zap, Award, Users, ArrowRight, Star } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const scrollToBento0 = () => {
  const el = document.getElementById("bento-0")
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 text-slate-900 font-sans antialiased overflow-hidden">
      {/* Hero Section */}
      <motion.header
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
        }}
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Badge superior */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-lg mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">Líder en repuestos automotrices</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              AutoParts
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Tu aliado confiable en{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
              repuestos automotrices
            </span>{" "}
            de calidad premium
          </motion.p>

          {/* Estadísticas rápidas */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-slate-500 font-medium">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                5K+
              </div>
              <div className="text-sm text-slate-500 font-medium">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                15+
              </div>
              <div className="text-sm text-slate-500 font-medium">Años</div>
            </div>
          </motion.div>

          {/* Botones de acción */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/catalogo">
              <motion.button
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>

            <Link to="/register">
              <motion.button
                className="group bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-slate-900 font-semibold py-4 px-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Crear Cuenta
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Flecha clickeable mejorada */}
        <motion.div
          className="absolute bottom-8 cursor-pointer group"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut" }}
          onClick={scrollToBento0}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") scrollToBento0()
          }}
          aria-label="Ir a sección Conoce nuestra esencia y compromiso"
        >
          <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-slate-200/50 group-hover:bg-white group-hover:shadow-xl transition-all duration-300">
            <ChevronDown className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
          </div>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="relative">
        {[
          {
            id: 0,
            title: "Conoce nuestra esencia ",
            Comp: InfoGrid,
            bg: "bg-white",
            icon: Award,
          },
          {
            id: 1,
            title: "Compromiso",
            Comp: InfoGrid2,
            bg: "bg-gradient-to-br from-slate-50 to-blue-50/30",
            icon: Zap,
          },
          {
            id: 2,
            title: "Preguntas Frecuentes",
            Comp: InfoGrid3,
            bg: "bg-white",
            icon: Star,
          },
          {
            id: 3,
            title: "Marcas que confían en nosotros",
            Comp: Carrusel,
            bg: "bg-gradient-to-br from-slate-50 to-blue-50/30",
            icon: Users,
          },
        ].map(({ id, title, Comp, bg, icon: Icon }) => (
          <motion.section
            key={id}
            id={id === 0 ? "bento-0" : undefined}
            className={`relative py-20 lg:py-32 ${bg} overflow-hidden`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={id}
            variants={sectionVariants}
          >
            {/* Elementos decorativos por sección */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className={`absolute top-10 ${
                  id % 2 === 0 ? "left-10" : "right-10"
                } w-24 h-24 bg-blue-200/10 rounded-full blur-2xl`}
              ></div>
              <div
                className={`absolute bottom-10 ${
                  id % 2 === 0 ? "right-20" : "left-20"
                } w-32 h-32 bg-purple-200/10 rounded-full blur-3xl`}
              ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Icono de sección */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg shadow-blue-500/25 mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h2>

                {/* Línea decorativa */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
              </motion.div>

              <Comp />
            </div>
          </motion.section>
        ))}
      </main>

      {/* Footer CTA Section */}
      <motion.section
        className="relative py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium">¿Listo para comenzar?</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Encuentra los repuestos que necesitas</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a miles de clientes satisfechos que confían en AutoParts para mantener sus vehículos en perfecto
              estado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalogo">
                <motion.button
                  className="bg-white text-slate-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Ver Catálogo Completo
                  </span>
                </motion.button>
              </Link>

              <Link to="/register">
                <motion.button
                  className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-2xl backdrop-blur-sm transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Crear Cuenta Gratis
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
