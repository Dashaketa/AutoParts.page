// src/controllers/transbankController.js
const transaction = require('../services/transbankService')
const pool        = require('../../config/db')



exports.initTransaction = async (req, res) => {
  const { usuario_id, buyOrder } = req.body;

  if (!buyOrder || !usuario_id) {
    return res.status(400).json({ error: 'Faltan datos para iniciar transacción' });
  }

  // Consultar carrito temporal para calcular monto total
  const conn = await pool.getConnection();
  try {
    const [items] = await conn.query(
      'SELECT cantidad, precio_unitario FROM carrito_temporal WHERE buy_order = ?',
      [buyOrder]
    );

    if (!items.length) {
      return res.status(400).json({ error: 'Carrito temporal vacío' });
    }

    const amount = items.reduce((sum, i) => sum + i.cantidad * i.precio_unitario, 0);

    const sessionId = `S-${usuario_id}-${Date.now()}`;
    const returnUrl = `${process.env.BACKEND_URL}/api/transbank/commit`;

    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);

    return res.json({
      token: response.token,
      url: response.url,
      buyOrder,
      sessionId
    });
  } catch (err) {
    console.error('Transbank init error:', err);
    return res.status(500).json({ error: err.message || err.toString() });
  } finally {
    conn.release();
  }
};


exports.commitTransaction = async (req, res) => {
  const token_ws = req.query.token_ws;

  try {
    const result = await transaction.commit(token_ws);
    console.log('Transbank commit result:', result);

    const responseCode = result.responseCode !== undefined ? result.responseCode : result.response_code;
    if (responseCode !== 0) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment/fail?code=${responseCode}`);
    }

    const buyOrder = result.buy_order;
    const usuarioId = buyOrder.split('-')[1];
    const amount = result.amount;

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    // Obtener items y dirección del carrito temporal
   // Recuerda que await conn.query devuelve un array, el primer elemento es el resultado
const [tbItems] = await conn.query(
  'SELECT producto_id, cantidad, precio_unitario, direccion_json FROM carrito_temporal WHERE buy_order = ?',
  [buyOrder]
);

if (!tbItems.length) {
  throw new Error('No se encontraron items para este pedido');
}

// Serializa la dirección como string JSON
const direccionJson = tbItems[0].direccion_json
  ? JSON.stringify(tbItems[0].direccion_json)
  : null;

const [r] = await conn.query(
  'INSERT INTO pedidos (usuario_id, total, estado, direccion) VALUES (?, ?, ?, ?)',
  [usuarioId, amount, 'completado', direccionJson]
);

    const pedidoId = r.insertId;

    // Crear detalle y descontar stock
    for (const it of tbItems) {
      await conn.query(
        'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [pedidoId, it.producto_id, it.cantidad, it.precio_unitario]
      );

      await conn.query(
        'UPDATE productos SET stock = stock - ? WHERE id = ?',
        [it.cantidad, it.producto_id]
      );
    }

    // Borrar carrito temporal
    await conn.query('DELETE FROM carrito_temporal WHERE buy_order = ?', [buyOrder]);

    await conn.commit();
    conn.release();

    return res.redirect(`${process.env.FRONTEND_URL}/payment/success?orderId=${pedidoId}`);
  } catch (err) {
    console.error('Transbank commit error:', err);
    return res.status(500).send('Error al confirmar el pago');
  }
};

