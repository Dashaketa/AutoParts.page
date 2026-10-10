import React from 'react';
import { motion } from 'framer-motion';

const bentoItems = [
  {
    title: '¿Cómo sé qué repuesto necesito?',
    description: 'Puedes ingresar el modelo y año de tu vehículo, o enviarnos una foto del repuesto actual.',
    bgImage: '/imagenes/2.png',
  },
  {
    title: '¿Qué garantías tienen los productos?',
    description: 'Todos los repuestos están cubiertos por garantía de funcionamiento y compatibilidad.',
    bgImage: '/imagenes/3.png',
  },
  {
    title: '¿Hacen envíos a regiones extremas?',
    description: 'Sí, llegamos a todo Chile. Solo asegúrate de ingresar bien tu dirección.',
    bgImage: '/imagenes/4.png',
  },
  {
    title: '¿Qué pasa si el repuesto no es compatible?',
    description: 'Te lo cambiamos sin costo adicional. Queremos que tengas la pieza correcta.',
    bgImage: '/imagenes/5.png',
  },
];

export default function CardGrid() {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {bentoItems.map(({ title, description, bgImage }, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer flex flex-col w-full max-w-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Imagen arriba con altura fija para mantener proporción */}
            <div
              className="h-48 sm:h-56 md:h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImage})` }}
              alt={title}
            />

            {/* Texto abajo */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
              <p className="text-gray-700 flex-grow">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
