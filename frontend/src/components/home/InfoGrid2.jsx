import React from 'react';
import { motion } from 'framer-motion';

export default function InfoGrid2() {
  return (
    <section className="bg-transparent text-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-[800px]">
          
          {/* Bento 1 - Nuestra Historia */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-6 md:p-8 md:col-span-4 bg-transparent h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute top-6 right-6 text-3xl">🏁</div>
            <div className="relative z-10 h-full flex flex-col justify-end">
              <motion.h3 
                className="text-xs font-semibold tracking-wider mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                NUESTRA HISTORIA
              </motion.h3>
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Nacimos con una meta clara
              </motion.h2>
              <motion.p 
                className="text-base md:text-lg max-w-[90%] mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Facilitar el acceso a repuestos confiables para todos los conductores de Chile.
              </motion.p>
              <motion.div
                className="w-16 h-1 mt-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url(/imagenes/13.png)] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black opacity-35 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-4 md:col-span-2 h-full">
            
            {/* Bento 2 - Nuestra Misión */}
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
                  className="text-xs font-semibold tracking-wider mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NUESTRA MISIÓN
                </motion.h3>
                <motion.h2 
                  className="text-xl font-bold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Soluciones automotrices confiables
                </motion.h2>
                <motion.p 
                  className="text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Tecnología, asesoría experta y atención cercana para cada cliente.
                </motion.p>
              </div>
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url(/imagenes/19.png)] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            </motion.div>
            
            {/* Bento 3 - Nuestros Valores */}
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
                  className="text-xs font-semibold tracking-wider mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NUESTROS VALORES
                </motion.h3>
                <motion.h2 
                  className="text-xl font-bold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Confianza, rapidez y transparencia
                </motion.h2>
                <motion.p 
                  className="text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Guiamos nuestro trabajo con integridad y pasión por lo que hacemos.
                </motion.p>
              </div>
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url(/imagenes/18.png)] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>

          {/* Bento 4 - Lo que nos mueve */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-8 md:col-span-6 h-48"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute top-4 right-4 text-2xl">🚀</div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <motion.h3 
                className="text-xs font-semibold tracking-wider mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                LO QUE NOS MUEVE
              </motion.h3>
              <motion.h2 
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Transformar el mundo de los repuestos
              </motion.h2>
              <motion.p 
                className="text-base"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                No solo vendemos piezas. Entregamos soluciones reales a personas reales.
              </motion.p>
            </div>
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url(/imagenes/15.png)] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black opacity-35 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
