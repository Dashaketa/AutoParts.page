const pool = require('../config/db');

const Pedido = {
  // Crear pedido
  crear: async (usuario_id, total) => {
    const [result] = await pool.query(
      'INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)',
      [usuario_id, total]
    );
    return result.insertId;
  },

  // Agregar detalle de pedido
  agregarDetalle: async (pedido_id, producto_id, cantidad, precio_unitario) => {
    await pool.query(
      'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [pedido_id, producto_id, cantidad, precio_unitario]
    );
  },

  // Obtener pedidos por usuario
  obtenerPorUsuario: async (usuario_id) => {
    const [pedidos] = await pool.query(
      'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha_pedido DESC',
      [usuario_id]
    );
    return pedidos;
  }
};

module.exports = Pedido;