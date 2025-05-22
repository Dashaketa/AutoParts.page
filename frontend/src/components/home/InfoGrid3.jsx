// src/components/home/InfoGrid3.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function InfoGrid3() {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento 1 */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-6 bg-gradient-to-br from-indigo-500 to-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 right-4 text-2xl">🔍</div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <motion.h3
                className="text-xl font-semibold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ¿Cómo sé qué repuesto necesito?
              </motion.h3>
              <motion.p
                className="text-sm text-indigo-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Puedes ingresar el modelo y año de tu vehículo, o enviarnos una foto del repuesto actual.
              </motion.p>
            </div>
          </motion.div>

          {/* Bento 2 */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-6 bg-gradient-to-br from-emerald-500 to-teal-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 right-4 text-2xl">✔️</div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <motion.h3
                className="text-xl font-semibold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ¿Qué garantías tienen los productos?
              </motion.h3>
              <motion.p
                className="text-sm text-emerald-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Todos los repuestos están cubiertos por garantía de funcionamiento y compatibilidad.
              </motion.p>
            </div>
          </motion.div>

          {/* Bento 3 */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-6 bg-gradient-to-br from-orange-500 to-red-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 right-4 text-2xl">🚚</div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <motion.h3
                className="text-xl font-semibold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                ¿Hacen envíos a regiones extremas?
              </motion.h3>
              <motion.p
                className="text-sm text-orange-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Sí, llegamos a todo Chile. Solo asegúrate de ingresar bien tu dirección.
              </motion.p>
            </div>
          </motion.div>

          {/* Bento 4 */}
          <motion.div
            className="group relative flex flex-col overflow-hidden rounded-xl p-6 bg-gradient-to-br from-purple-500 to-pink-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 right-4 text-2xl">⚙️</div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <motion.h3
                className="text-xl font-semibold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                ¿Qué pasa si el repuesto no es compatible?
              </motion.h3>
              <motion.p
                className="text-sm text-purple-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Te lo cambiamos sin costo adicional. Queremos que tengas la pieza correcta.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}