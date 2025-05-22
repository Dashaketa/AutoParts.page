import React from 'react';
import { motion } from 'framer-motion';

export default function InfoGrid2() {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[800px]"> {/* Altura fija añadida */}
          
          {/* Bento 1 - Nuestra Historia (Larger left) */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-6 md:p-8 md:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute top-6 right-6 text-3xl">🏁</div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <motion.h3 
                className="text-xs font-semibold tracking-wider text-blue-100 mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                NUESTRA HISTORIA
              </motion.h3>
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Nacimos con una meta clara
              </motion.h2>
              <motion.p 
                className="text-blue-50 text-base md:text-lg max-w-[90%] mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Facilitar el acceso a repuestos confiables para todos los conductores de Chile.
              </motion.p>
              <motion.div
                className="w-16 h-1 bg-blue-300 mt-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2483&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          </motion.div>

          {/* Columna derecha - 2 bentos apilados */}
          <div className="flex flex-col gap-4 md:col-span-2 h-full">
            
            {/* Bento 2 - Nuestra Misión (Top right) */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-xl p-6 h-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute top-4 right-4 text-2xl">🎯</div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <motion.h3 
                  className="text-xs font-semibold tracking-wider text-emerald-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NUESTRA MISIÓN
                </motion.h3>
                <motion.h2 
                  className="text-xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Soluciones automotrices confiables
                </motion.h2>
                <motion.p 
                  className="text-emerald-50 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Tecnología, asesoría experta y atención cercana para cada cliente.
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            </motion.div>
            
            {/* Bento 3 - Nuestros Valores (Bottom right) */}
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-xl p-6 h-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute top-4 right-4 text-2xl">🤝</div>
              <div className="relative z-10 h-full flex flex-col justify-end">
                <motion.h3 
                  className="text-xs font-semibold tracking-wider text-amber-100 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NUESTROS VALORES
                </motion.h3>
                <motion.h2 
                  className="text-xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Confianza, rapidez y transparencia
                </motion.h2>
                <motion.p 
                  className="text-amber-50 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Guiamos nuestro trabajo con integridad y pasión por lo que hacemos.
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            </motion.div>
          </div>

          {/* Bento 4 - Lo que nos mueve (Full width bottom) */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-8 md:col-span-6 bg-gradient-to-br from-purple-600 to-pink-600 h-48"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute top-4 right-4 text-2xl">🚀</div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <motion.h3 
                className="text-xs font-semibold tracking-wider text-purple-100 mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                LO QUE NOS MUEVE
              </motion.h3>
              <motion.h2 
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Transformar el mundo de los repuestos
              </motion.h2>
              <motion.p 
                className="text-purple-50 text-base"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                No solo vendemos piezas. Entregamos soluciones reales a personas reales.
              </motion.p>
            </div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2340&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}