import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="
        relative left-1/2 w-screen -translate-x-1/2
        bg-[#273043] text-white pt-12 pb-8 mt-24
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenido centrado */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo & descripción */}
        <motion.div
          custom={0}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-[#EFF6EE] mb-2">AutoParts</h2>
          <p className="text-sm text-white/70">
            Tu aliado confiable en repuestos automotrices.<br/>
            Calidad, rapidez y atención personalizada.
          </p>
        </motion.div>

        {/* Navegación */}
        <motion.nav
          custom={1}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-[#EFF6EE] mb-4">Navegación</h3>
          <ul className="space-y-2 text-[#EFF6EE] text-sm">
            {[
              { to: '/home',   label: 'Inicio'     },
              { to: '/catalogo', label: 'Catálogo'  },
              { to: '/dashboard', label: 'Dashboard'},
              { to: '/login',   label: 'Login'     }
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="relative inline-block px-1 py-0.5 hover:text-[#EFA00B] transition"
                >
                  <span className="relative z-10">{label}</span>
                  <motion.span
                    className="absolute inset-0 bg-[#EFA00B] opacity-0 rounded-md"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Contacto */}
        <motion.div
          custom={2}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-[#EFF6EE] mb-4">Contacto</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <span className="font-medium text-[#EFF6EE]">Teléfono:</span> +56 9 1234 5678
            </li>
            <li>
              <span className="font-medium text-[#EFF6EE]">Email:</span> contacto@autoparts.cl
            </li>
            <li>
              <span className="font-medium text-[#EFF6EE]">Dirección:</span> Santiago, Chile
            </li>
          </ul>
        </motion.div>

        {/* Redes */}
        <motion.div
          custom={3}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-[#EFF6EE] mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <motion.a
              href="https://wa.me/56912345678"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/10 rounded-full"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="https://cdn.simpleicons.org/whatsapp/FFFFFF?size=24"
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </motion.a>
            <motion.a
              href="https://instagram.com/autoparts"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/10 rounded-full"
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="https://cdn.simpleicons.org/instagram/FFFFFF?size=24"
                alt="Instagram"
                className="w-6 h-6"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Línea inferior */}
      <motion.div
        className="border-t border-white/20 text-center text-xs text-white/60 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} AutoParts. Todos los derechos reservados.
      </motion.div>
    </motion.footer>
  );
}
