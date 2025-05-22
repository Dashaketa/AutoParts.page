// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InfoGrid from '../components/home/InfoGrid';
import InfoGrid2 from '../components/home/InfoGrid2';
import InfoGrid3 from '../components/home/InfoGrid3';
import Carrusel from '../components/home/Carrusel';

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
};

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      {/* Hero Section */}
      <motion.header
        className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-blue-50 to-white"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AutoParts
            </span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Tu aliado confiable en repuestos automotrices de calidad
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link to="/catalogo">
              <motion.button
                className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explorar Catálogo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 text-blue-600"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="overflow-hidden">
        {[
          { id: 0, title: 'Conoce nuestra esencia y compromiso', Comp: InfoGrid, bg: 'bg-white' },
          { id: 1, title: '🔧 ¿Cómo Funciona?', Comp: InfoGrid2, bg: 'bg-gray-50' },
          { id: 2, title: 'Servicios destacados', Comp: InfoGrid3, bg: 'bg-white' },
          { id: 3, title: 'Marcas que confían en nosotros', Comp: Carrusel, bg: 'bg-gray-50' },
        ].map(({ id, title, Comp, bg }) => (
          <motion.section
            key={id}
            className={`py-20 ${bg}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={id}
            variants={sectionVariants}
          >
            <div className="max-w-7xl mx-auto px-6">
              <motion.h2
                className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </motion.h2>
              <Comp />
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
}