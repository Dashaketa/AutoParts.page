// src/components/home/InfoGrid3.jsx
import React from 'react';
import { motion } from 'framer-motion';

const bentoItems = [
  {
    title: '¿Cómo sé qué repuesto necesito?',
    description: 'Puedes ingresar el modelo y año de tu vehículo, o enviarnos una foto del repuesto actual.',
    bgImage: '/imagenes/2.png', // Aquí va la URL o path de la imagen de fondo
    textColor: 'text-white',
    icon: '🔍',
    delay: 0.1,
  },
  {
    title: '¿Qué garantías tienen los productos?',
    description: 'Todos los repuestos están cubiertos por garantía de funcionamiento y compatibilidad.',
    bgImage: '/imagenes/3.png',
    textColor: 'text-white',
    icon: '✔️',
    delay: 0.2,
  },
  {
    title: '¿Hacen envíos a regiones extremas?',
    description: 'Sí, llegamos a todo Chile. Solo asegúrate de ingresar bien tu dirección.',
    bgImage: '/imagenes/4.png',
    textColor: 'text-white',
    icon: '🚚',
    delay: 0.3,
  },
  {
    title: '¿Qué pasa si el repuesto no es compatible?',
    description: 'Te lo cambiamos sin costo adicional. Queremos que tengas la pieza correcta.',
    bgImage: '/imagenes/5.png',
    textColor: 'text-white',
    icon: '⚙️',
    delay: 0.4,
  },
];

export default function InfoGrid3() {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bentoItems.map(({ title, description, bgImage, textColor, icon, delay }, index) => (
            <motion.div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-xl p-6"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Overlay para oscurecer la imagen y que el texto resalte */}
              <div className="absolute inset-0 bg-transparent bg-opacity-50 pointer-events-none rounded-xl" />
              
              <div className="absolute top-4 right-4 text-2xl z-10">{icon}</div>

              <div className={`relative z-10 flex flex-col h-full justify-center`}>
                <motion.h3
                  className={`text-xl font-semibold mb-2 ${textColor}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: delay + 0.1 }}
                >
                  {title}
                </motion.h3>
                <motion.p
                  className={`text-sm ${textColor}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: delay + 0.2 }}
                >
                  {description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
