import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll al top al montar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setIsSubmitting(true);

    try {
      await api.post('/usuarios', { nombre, email, contraseña });
      setMensaje('¡Usuario registrado exitosamente!');
      setNombre('');
      setEmail('');
      setContraseña('');
      // Esperamos un momento para que se vea el mensaje
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (err) {
      setError(err.response?.data?.error || 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h2
          className="text-center text-3xl font-semibold text-gray-900 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Registro de Usuario
        </motion.h2>

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-2 rounded-lg mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: [ -10, 10, -5, 0 ], opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
          {mensaje && (
            <motion.div
              key="msg"
              className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-2 rounded-lg mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {mensaje}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              disabled={isSubmitting}
              required
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1789FC] disabled:opacity-50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              placeholder="ejemplo@dominio.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1789FC] disabled:opacity-50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
              disabled={isSubmitting}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1789FC] disabled:opacity-50"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            className="w-full bg-[#273043] hover:bg-[#1789FC] text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.3-3.3A12 12 0 004 12z"
                />
              </svg>
            ) : (
              'Registrar'
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/login"
            className="text-sm font-medium text-[#1789FC] hover:text-[#273043] transition"
          >
            ← Ya tengo cuenta, iniciar sesión
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
