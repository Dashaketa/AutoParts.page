"use client"

import { motion } from "framer-motion"
import { Target, Flag, Heart, Rocket, Award, Users, Shield, Zap, CheckCircle, Star } from "lucide-react"

export default function InfoGrid2() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50/30 text-slate-900">
      <div className="py-12 px-4 mx-auto max-w-7xl lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 min-h-[800px]">
          {/* Bento 1 - Nuestra Historia (Principal) */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 p-8 md:col-span-4 h-full min-h-[400px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01, y: -4 }}
          >
            {/* Fondo con imagen */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url(/imagenes/13.png)] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/70 transition-all duration-500" />
            </div>

            {/* Icono decorativo */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <Flag className="w-8 h-8 text-white" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 h-full flex flex-col justify-end text-white">
              <motion.div
                className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-4 w-fit"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-bold tracking-wider text-blue-100">NUESTRA HISTORIA</span>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-black mb-4 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Nacimos con una{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  meta clara
                </span>
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-slate-200 max-w-[90%] mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Facilitar el acceso a repuestos confiables para todos los conductores de Chile, transformando la
                experiencia de compra automotriz.
              </motion.p>

              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-6 md:col-span-2 h-full">
            {/* Bento 2 - Nuestra Misión */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 p-6 flex-1 min-h-[180px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url(/imagenes/19.png)] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-emerald-600/90 group-hover:from-green-500/90 group-hover:to-emerald-500/90 transition-all duration-500" />
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end text-white">
                <motion.div
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-green-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Zap className="w-3 h-3" />
                  NUESTRA MISIÓN
                </motion.div>
                <motion.h2
                  className="text-xl font-bold mb-2 leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Soluciones automotrices confiables
                </motion.h2>
                <motion.p
                  className="text-sm text-green-100 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Tecnología, asesoría experta y atención cercana para cada cliente.
                </motion.p>
              </div>
            </motion.div>

            {/* Bento 3 - Nuestros Valores */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 p-6 flex-1 min-h-[180px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url(/imagenes/18.png)] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 group-hover:from-blue-500/90 group-hover:to-indigo-500/90 transition-all duration-500" />
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end text-white">
                <motion.div
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-blue-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Shield className="w-3 h-3" />
                  NUESTROS VALORES
                </motion.div>
                <motion.h2
                  className="text-xl font-bold mb-2 leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Confianza, rapidez y transparencia
                </motion.h2>
                <motion.p
                  className="text-sm text-blue-100 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Guiamos nuestro trabajo con integridad y pasión por lo que hacemos.
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Bento 4 - Lo que nos mueve (Ancho completo) */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 p-8 md:col-span-6 min-h-[200px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.01, y: -4 }}
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url(/imagenes/15.png)] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-purple-600/90 group-hover:from-purple-500/90 group-hover:via-pink-500/90 group-hover:to-purple-500/90 transition-all duration-500" />
            </div>

            <div className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <Rocket className="w-7 h-7 text-white" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center text-white">
              <motion.div
                className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30 mb-4 w-fit"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Rocket className="w-4 h-4 text-purple-300" />
                <span className="text-xs font-bold tracking-wider text-purple-100">LO QUE NOS MUEVE</span>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-black mb-4 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Transformar el mundo de los{" "}
                <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  repuestos
                </span>
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-purple-100 max-w-4xl leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                No solo vendemos piezas. Entregamos soluciones reales a personas reales, construyendo relaciones
                duraderas basadas en la confianza y la excelencia.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Sección de logros adicionales */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
        </motion.div>
      </div>
    </section>
  )
}
