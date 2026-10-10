import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PedidoActions({ pedido, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Opciones basadas en el estado actual
  const getOptions = () => {
    switch(pedido.estado) {
      case 'pendiente':
        return [
          { action: 'completado', label: 'Completar', color: 'text-green-600 hover:bg-green-50' },
          { action: 'cancelado', label: 'Cancelar', color: 'text-red-600 hover:bg-red-50' }
        ];
      case 'completado':
        return [
          { action: 'pendiente', label: 'Poner Pendiente', color: 'text-yellow-600 hover:bg-yellow-50' },
          { action: 'cancelado', label: 'Cancelar', color: 'text-red-600 hover:bg-red-50' }
        ];
      case 'cancelado':
        return [
          { action: 'pendiente', label: 'Poner Pendiente', color: 'text-yellow-600 hover:bg-yellow-50' },
          { action: 'completado', label: 'Completar', color: 'text-green-600 hover:bg-green-50' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 text-sm"
      >
        Administrar ▼
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200"
        >
          <div className="py-1">
            {getOptions().map((option) => (
              <button
                key={option.action}
                onClick={() => {
                  onStatusChange(pedido.id, option.action);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${option.color}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}