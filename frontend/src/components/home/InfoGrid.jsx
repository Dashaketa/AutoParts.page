"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, Shield, Users, Wrench, Star, CheckCircle, Zap } from "lucide-react"

export default function InfoGrid() {
  return (
    <section className="bg-gradient-to-br from-white to-slate-50/50">
      <div className="py-8 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-full">
          {/* Item principal (grande) */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50 col-span-2 sm:col-span-1 md:col-span-3 min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -8 }}
          >
            {/* Fondo con imagen */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/imagenes/14.png')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20 group-hover:from-slate-900/60 transition-all duration-500" />
            </div>

            {/* Elementos decorativos */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <Award className="w-6 h-6 text-white" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <motion.div
                className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/30 mb-4 w-fit"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-3 h-3 text-blue-300" />
                <span className="text-xs font-semibold tracking-wider text-blue-100">NUESTRA ESENCIA</span>
              </motion.div>

              <motion.h3
                className="text-3xl lg:text-4xl font-black tracking-tight mb-4 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Calidad y Confianza en{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Cada Repuesto
                </span>
              </motion.h3>

              <motion.p
                className="text-base lg:text-lg text-slate-200 max-w-[90%] mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Más de 15 años especializándonos en repuestos automotrices de primera calidad. Nuestro compromiso es
                mantener tu vehículo funcionando como el primer día.
              </motion.p>

              <motion.div
                className="flex items-center gap-3 text-sm font-semibold group-hover:gap-4 transition-all duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-white">Conoce más</span>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Columna vertical con 3 items */}
          <div className="flex flex-col gap-6 col-span-1">
            {/* Card 2 - Experiencia */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 min-h-[140px] flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/imagenes/16.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-emerald-600/90 group-hover:from-green-500/90 group-hover:to-emerald-500/90 transition-all duration-500" />
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <motion.div
                  className="inline-flex items-center gap-1 text-xs font-medium text-green-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Zap className="w-3 h-3" />
                  EXPERIENCIA
                </motion.div>
                <motion.h3
                  className="text-lg font-bold tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  15+ Años de Trayectoria
                </motion.h3>
              </div>
            </motion.div>

            {/* Card 3 - Garantía */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 min-h-[140px] flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/imagenes/18.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 group-hover:from-blue-500/90 group-hover:to-indigo-500/90 transition-all duration-500" />
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <motion.div
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Shield className="w-3 h-3" />
                  GARANTÍA
                </motion.div>
                <motion.h3
                  className="text-lg font-bold tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Productos Certificados
                </motion.h3>
              </div>
            </motion.div>

            {/* Card 4 - Equipo */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-slate-200/50 min-h-[140px] flex-grow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/imagenes/9.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-pink-600/90 group-hover:from-purple-500/90 group-hover:to-pink-500/90 transition-all duration-500" />
              </div>

              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                <motion.div
                  className="inline-flex items-center gap-1 text-xs font-medium text-purple-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Wrench className="w-3 h-3" />
                  EQUIPO
                </motion.div>
                <motion.h3
                  className="text-lg font-bold tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Expertos Especializados
                </motion.h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Estadísticas adicionales */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <div className="text-sm text-slate-600 font-medium">Repuestos en Stock</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              5K+
            </div>
            <div className="text-sm text-slate-600 font-medium">Clientes Satisfechos</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-sm text-slate-600 font-medium">Productos Garantizados</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm text-slate-600 font-medium">Soporte Técnico</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
