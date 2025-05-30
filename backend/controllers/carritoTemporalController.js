// src/controllers/carritoTemporalController.js
const pool = require('../config/db');

exports.guardarCarritoTemporal = async (req, res) => {
  const { buyOrder, usuario_id, items, direccion } = req.body;

  if (!buyOrder || !usuario_id || !items || items.length === 0) {
    return res.status(400).json({ error: 'Faltan datos para guardar carrito temporal' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Borrar registros previos para ese buyOrder
    await conn.query('DELETE FROM carrito_temporal WHERE buy_order = ?', [buyOrder]);

    // Insertar los items nuevos
    for (const item of items) {
      await conn.query(
        'INSERT INTO carrito_temporal (buy_order, usuario_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
        [buyOrder, usuario_id, item.id, item.quantity, item.price]
      );
    }

    // Guardar la dirección serializada en todos los registros
    // Para evitar duplicar datos en cada fila, podrías crear una tabla separada para la dirección si quieres.
    // Pero aquí simplificamos guardando en cada fila (podrías hacer UPDATE en todas filas).
    if (direccion) {
      const direccionStr = JSON.stringify(direccion);
      await conn.query(
        'UPDATE carrito_temporal SET direccion_json = ? WHERE buy_order = ?',
        [direccionStr, buyOrder]
      );
    }

    await conn.commit();
    res.json({ message: 'Carrito temporal guardado con dirección' });
  } catch (error) {
    await conn.rollback();
    console.error('Error al guardar carrito temporal:', error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    conn.release();
  }
};
