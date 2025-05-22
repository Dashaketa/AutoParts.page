// src/controllers/transbankController.js
const transaction = require('../services/transbankService')
const pool        = require('../../config/db')

exports.initTransaction = async (req, res) => {
  const { usuario_id, items } = req.body

  // 1) Mapea los items del frontend al formato que usa Transbank
  const tbItems = items.map(i => ({
    producto_id:     i.id,
    cantidad:        i.quantity,
    precio_unitario: i.price
  }))

  // 2) Calcula el total
  const amount = tbItems.reduce((sum, it) =>
    sum + it.cantidad * it.precio_unitario
  , 0)

  // 3) Genera identificadores únicos
  const buyOrder  = `O-${usuario_id}-${Date.now()}`
  const sessionId = `S-${usuario_id}-${Date.now()}`

  // 4) Construye y loggea la return_url completa
  const returnUrl = `${process.env.BACKEND_URL}/api/transbank/commit`
  console.log('→ Webpay return_url:', returnUrl)

  // 5) Guarda los items en sesión para el commit
  req.session = req.session || {}
  req.session[buyOrder] = tbItems

  try {
    // 6) Inicia la transacción
    const response = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    )

    return res.json({
      token:     response.token,
      url:       response.url,
      buyOrder,
      sessionId
    })
  } catch (err) {
    console.error('Transbank init error:', err)
    return res.status(500).json({ error: err.message || err.toString() })
  }
}

exports.commitTransaction = async (req, res) => {
  const token_ws = req.query.token_ws

  try {
    const result = await transaction.commit(token_ws)
    console.log('Transbank commit result:', result)

    // 1) extraemos el código real (soporta ambos nombres)
    const responseCode = 
      result.responseCode !== undefined
        ? result.responseCode
        : result.response_code

    // 2) si no es aprobado, vamos al fail con el código correcto
    if (responseCode !== 0) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment/fail?code=${responseCode}`
      )
    }

    // === resto inalterado para crear el pedido ===
    const tbItems   = req.session[result.buy_order] || []
    const usuarioId = result.buy_order.split('-')[1]
    const amount    = result.amount

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const [r] = await conn.query(
      'INSERT INTO pedidos (usuario_id, total, estado) VALUES (?,?,?)',
      [usuarioId, amount, 'completado']
    )
    const pedidoId = r.insertId

    for (const it of tbItems) {
      await conn.query(
        'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)',
        [pedidoId, it.producto_id, it.cantidad, it.precio_unitario]
      )
      await conn.query(
        'UPDATE productos SET stock = stock - ? WHERE id = ?',
        [it.cantidad, it.producto_id]
      )
    }

    await conn.commit()
    conn.release()

    return res.redirect(
      `${process.env.FRONTEND_URL}/payment/success?orderId=${pedidoId}`
    )
  } catch (err) {
    console.error('Transbank commit error:', err)
    return res.status(500).send('Error al confirmar el pago')
  }
}
