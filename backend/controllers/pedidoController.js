// src/controllers/pedidoController.js
const pool = require("../config/db");
const PDFDocument = require('pdfkit');


// Crear nuevo pedido
exports.crearPedido = async (req, res) => {
  console.log("Body recibido en crearPedido:", req.body);
  const { usuario_id, items } = req.body;

  if (!usuario_id || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Faltan usuario_id o items para el pedido" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Insertar cabecera
    const [r] = await conn.query(
      "INSERT INTO pedidos (usuario_id, total, estado) VALUES (?, ?, ?)",
      [usuario_id, 0, "pendiente"]
    );
    const pedidoId = r.insertId;

    // 2) Insertar detalles y acumular total
    let total = 0;
    for (const { producto_id, cantidad, precio_unitario } of items) {
      await conn.query(
        `INSERT INTO detalles_pedido
           (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [pedidoId, producto_id, cantidad, precio_unitario]
      );
      total += cantidad * precio_unitario;
    }

    // 3) Actualizar total
    await conn.query("UPDATE pedidos SET total = ? WHERE id = ?", [
      total,
      pedidoId,
    ]);

    await conn.commit();
    return res
      .status(201)
      .json({ pedidoId, total, message: "Pedido creado correctamente" });
  } catch (error) {
    console.error("Error en crearPedido:", error);
    await conn.rollback();
    return res
      .status(500)
      .json({ error: "Error interno al crear el pedido" });
  } finally {
    conn.release();
  }
};

// Listar pedidos de un usuario
exports.obtenerPedidosUsuario = async (req, res) => {
  console.log("Params recibidos en obtenerPedidosUsuario:", req.params);
  const usuarioId = Number(req.params.usuarioId);

  try {
    const [pedidos] = await pool.query(
      "SELECT id, fecha_pedido, estado, total FROM pedidos WHERE usuario_id = ? ORDER BY fecha_pedido DESC",
      [usuarioId]
    );
    return res.json({ pedidos });
  } catch (error) {
    console.error("Error en obtenerPedidosUsuario:", error);
    return res
      .status(500)
      .json({ error: "Error interno al obtener los pedidos" });
  }
};

// Obtener detalle de un pedido
// src/controllers/pedidoController.js

exports.obtenerDetallePedido = async (req, res) => {
  console.log("Params recibidos en obtenerDetallePedido:", req.params);
  const pedidoId = Number(req.params.pedidoId);

  try {
    const [detalle] = await pool.query(
      `SELECT 
         dp.producto_id, 
         p.nombre, 
         p.marca, 
         p.descripcion, 
         p.imagen, 
         dp.cantidad, 
         dp.precio_unitario
       FROM detalles_pedido dp
       JOIN productos p ON dp.producto_id = p.id
       WHERE dp.pedido_id = ?`,
      [pedidoId]
    );

    if (detalle.length === 0) {
      return res
        .status(404)
        .json({ error: "Pedido no encontrado o sin detalles" });
    }

    return res.json({ detalle });
  } catch (error) {
    console.error("Error en obtenerDetallePedido:", error);
    return res
      .status(500)
      .json({ error: "Error interno al obtener detalle del pedido" });
  }
};


// Listar todos los pedidos (panel admin)
exports.obtenerTodosLosPedidos = async (req, res) => {
  console.log("Llamada a obtenerTodosLosPedidos");
  try {
    const [pedidos] = await pool.query(
      `SELECT p.id, p.fecha_pedido, p.estado, p.total, u.nombre AS usuario
       FROM pedidos p
       JOIN usuarios u ON p.usuario_id = u.id
       ORDER BY p.fecha_pedido DESC`
    );
    return res.json({ pedidos });
  } catch (error) {
    console.error("Error en obtenerTodosLosPedidos:", error);
    return res
      .status(500)
      .json({ error: "Error interno al listar todos los pedidos" });
  }
};

// Actualizar estado o total de un pedido
exports.actualizarPedido = async (req, res) => {
  console.log("Body/params en actualizarPedido:", req.params, req.body);
  const pedidoId = Number(req.params.pedidoId);
  const { estado, total } = req.body;

  try {
    const campos = [];
    const valores = [];
    if (estado) {
      campos.push("estado = ?");
      valores.push(estado);
    }
    if (total !== undefined) {
      campos.push("total = ?");
      valores.push(total);
    }
    if (campos.length === 0) {
      return res.status(400).json({ error: "Nada para actualizar" });
    }
    valores.push(pedidoId);

    await pool.query(
      `UPDATE pedidos SET ${campos.join(", ")} WHERE id = ?`,
      valores
    );
    return res.json({ message: "Pedido actualizado correctamente" });
  } catch (error) {
    console.error("Error en actualizarPedido:", error);
    return res
      .status(500)
      .json({ error: "Error interno al actualizar el pedido" });
  }
};

// Cancelar (marcar) un pedido
exports.eliminarPedido = async (req, res) => {
  console.log("Params en eliminarPedido:", req.params);
  const pedidoId = Number(req.params.pedidoId);

  try {
    await pool.query(
      "UPDATE pedidos SET estado = 'cancelado' WHERE id = ?",
      [pedidoId]
    );
    return res.json({ message: "Pedido cancelado correctamente" });
  } catch (error) {
    console.error("Error en eliminarPedido:", error);
    return res
      .status(500)
      .json({ error: "Error interno al cancelar el pedido" });
  }
};


// Generar PDF del pedido
exports.generarPedidoPDF = async (req, res) => {
  const pedidoId = req.params.id;

  try {
    // Obtener cabecera del pedido
    const [pedidoRows] = await pool.query(`
      SELECT p.id, p.fecha_pedido, p.estado, u.nombre AS cliente_nombre, u.email
      FROM pedidos p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.id = ?
    `, [pedidoId]);

    if (pedidoRows.length === 0) {
      return res.status(404).send('Pedido no encontrado');
    }

    const pedido = pedidoRows[0];

    // Obtener detalles
    const [detalles] = await pool.query(`
      SELECT d.*, pr.nombre, pr.marca, pr.descripcion, pr.imagen
      FROM detalles_pedido d
      JOIN productos pr ON d.producto_id = pr.id
      WHERE d.pedido_id = ?
    `, [pedidoId]);

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=pedido.pdf');
    doc.pipe(res);

    // Encabezado
    doc
      .fillColor('#273043')
      .fontSize(24)
      .text(`Cotizacion#${pedido.id}`, { align: 'center' });

    doc.moveDown();
    doc
      .fontSize(12)
      .fillColor('black')
      .text(`Cliente: ${pedido.cliente_nombre}`, { continued: true })
      .text(`  (${pedido.email})`);

    doc.text(`Fecha: ${new Date(pedido.fecha_pedido).toLocaleDateString()}`);
    doc.text(`Estado: ${pedido.estado}`);
    doc.moveDown(1.5);

    // Línea divisoria
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .strokeColor('#cccccc')
      .lineWidth(1)
      .stroke();

    doc.moveDown(1);

    // Tabla de productos
    let total = 0;
    detalles.forEach((item, index) => {
      const subtotal = item.precio_unitario * item.cantidad;
      total += subtotal;

      doc
        .fontSize(14)
        .fillColor('#1789FC')
        .text(`${item.nombre} - ${item.marca}`, { underline: true });

      doc
        .fontSize(11)
        .fillColor('black')
        .text(`Descripción: ${item.descripcion}`)
        .text(`Cantidad: ${item.cantidad} x $${item.precio_unitario.toLocaleString()}`)
        .text(`Subtotal: $${subtotal.toLocaleString()}`)
        .moveDown(1);

      // Línea separadora
      if (index < detalles.length - 1) {
        doc
          .moveTo(doc.page.margins.left, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .strokeColor('#e0e0e0')
          .lineWidth(0.5)
          .stroke();

        doc.moveDown();
      }
    });

    // Total
    doc.moveDown(2);
    doc
      .fontSize(16)
      .fillColor('#273043')
      .text(`TOTAL: $${total.toLocaleString()}`, { align: 'right', underline: true });

    doc.end();
  } catch (err) {
    console.error('Error al generar PDF:', err.message);
    res.status(500).send('Error interno al generar el PDF');
  }
};
// Obtener los 5 productos más vendidos
exports.getTopProductos = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    
    const query = `
      SELECT 
        p.id,
        p.nombre,
        p.marca,
        p.imagen,
        SUM(dp.cantidad) as vendidos,
        SUM(dp.cantidad * dp.precio_unitario) as total_ventas
      FROM detalles_pedido dp
      JOIN productos p ON dp.producto_id = p.id
      JOIN pedidos ped ON dp.pedido_id = ped.id
      WHERE ped.estado = 'completado'
      ${fechaInicio && fechaFin ? 
        `AND ped.fecha_pedido BETWEEN ? AND ?` : ''}
      GROUP BY p.id
      ORDER BY vendidos DESC
      LIMIT 5
    `;

    const params = [];
    if (fechaInicio && fechaFin) {
      params.push(fechaInicio, fechaFin);
    }

    const [result] = await pool.query(query, params);
    
    res.json(result.map(item => ({
      ...item,
      vendidos: Number(item.vendidos),
      total_ventas: Number(item.total_ventas)
    })));

  } catch (error) {
    console.error('Error en getTopProductos:', error);
    res.status(500).json({ 
      error: 'Error al obtener productos más vendidos',
      detalle: error.message 
    });
  }
};

// Filtrar pedidos por fecha y estado
exports.getPedidosFiltrados = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, estado } = req.query;
    
    let query = `
      SELECT 
        p.id,
        p.fecha_pedido,
        p.estado,
        p.total,
        u.nombre as cliente,
        u.email
      FROM pedidos p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE 1=1
    `;

    const params = [];
    
    if (fechaInicio && fechaFin) {
      query += ` AND p.fecha_pedido BETWEEN ? AND ?`;
      params.push(fechaInicio, fechaFin);
    }
    
    if (estado && estado !== 'todos') {
      query += ` AND p.estado = ?`;
      params.push(estado);
    }

    query += ` ORDER BY p.fecha_pedido DESC LIMIT 5`;

    const [pedidos] = await pool.query(query, params);
    
    // Formatear fechas
    const pedidosFormateados = pedidos.map(p => ({
      ...p,
      fecha_pedido: new Date(p.fecha_pedido).toISOString()
    }));

    res.json(pedidosFormateados);

  } catch (error) {
    console.error('Error en getPedidosFiltrados:', error);
    res.status(500).json({ 
      error: 'Error al obtener pedidos',
      detalle: error.message 
    });
  }
};

// Generar Factura PDF para pedidos completados
exports.generarFacturaPDF = async (req, res) => {
  const { pedidoId } = req.params;

  try {
    // Verificar que el pedido está completado
    const [pedido] = await pool.query(
      `SELECT p.id, p.fecha_pedido, p.total, p.estado, 
       u.nombre AS cliente_nombre, u.email, u.direccion
       FROM pedidos p
       JOIN usuarios u ON p.usuario_id = u.id
       WHERE p.id = ? AND p.estado = 'completado'`,
      [pedidoId]
    );

    if (pedido.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado o no está completado" });
    }

    // Obtener detalles
    const [detalles] = await pool.query(
      `SELECT dp.cantidad, dp.precio_unitario, 
       pr.nombre, pr.marca, pr.descripcion
       FROM detalles_pedido dp
       JOIN productos pr ON dp.producto_id = pr.id
       WHERE dp.pedido_id = ?`,
      [pedidoId]
    );

    // Configurar PDF
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${pedidoId}.pdf`);
    doc.pipe(res);

    // Encabezado
    doc
      .fillColor('#273043')
      .fontSize(20)
      .text('TALLER DE MANOLO', { align: 'center' })
      .fontSize(14)
      .text('Factura de Venta', { align: 'center' })
      .moveDown();

    // Datos del cliente
    doc
      .fontSize(12)
      .text(`Cliente: ${pedido[0].cliente_nombre}`)
      .text(`Dirección: ${pedido[0].direccion}`)
      .text(`Email: ${pedido[0].email}`)
      .text(`Fecha: ${new Date(pedido[0].fecha_pedido).toLocaleDateString()}`)
      .text(`Factura #: ${pedidoId}`)
      .moveDown();

    // Línea divisoria
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .strokeColor('#cccccc')
      .lineWidth(1)
      .stroke();

    // Detalles de productos
    doc.moveDown();
    doc.fontSize(14).text('Detalles de la Compra:', { underline: true });
    doc.moveDown(0.5);

    detalles.forEach(item => {
      const subtotal = item.precio_unitario * item.cantidad;
      doc
        .fontSize(12)
        .text(`${item.nombre} - ${item.marca}`)
        .text(`Cantidad: ${item.cantidad} x $${item.precio_unitario.toLocaleString('es-CL')} = $${subtotal.toLocaleString('es-CL')}`)
        .moveDown(0.5);
    });

    // Total
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Total: $${pedido[0].total.toLocaleString('es-CL')}`, { align: 'right' });

    doc.end();
  } catch (error) {
    console.error('Error al generar factura:', error);
    res.status(500).json({ error: 'Error al generar factura' });
  }
};
// Obtener detalles de una factura (pedido)
exports.obtenerDetallesFactura = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Buscar pedido + datos del cliente
    const [pedido] = await pool.query(
      `SELECT p.*, u.nombre as cliente, u.email, u.direccion
       FROM pedidos p
       JOIN usuarios u ON p.usuario_id = u.id
       WHERE p.id = ?`,
      [id]
    );

    // ⚠️ Verificar que el pedido exista
    if (!pedido || pedido.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    // 2. Buscar los items del pedido
    const [items] = await pool.query(
      `SELECT dp.*, pr.nombre, pr.marca, pr.imagen
       FROM detalles_pedido dp
       JOIN productos pr ON dp.producto_id = pr.id
       WHERE dp.pedido_id = ?`,
      [id]
    );

    // 3. Enviar respuesta
    res.json({
      ...pedido[0],
      items
    });

  } catch (error) {
    console.error("Error al obtener factura:", error);
    res.status(500).json({ error: "Error al obtener factura" });
  }
};

// Crear factura desde un pedido
exports.crearFacturaDesdePedido = async (req, res) => {
  const pedidoId = Number(req.params.pedidoId);
  const metodo_pago = req.body.metodo_pago || "transferencia";

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Obtener el pedido y usuario
    const [pedidoRows] = await conn.query(
      `SELECT p.total, u.id AS cliente_id
       FROM pedidos p
       JOIN usuarios u ON p.usuario_id = u.id
       WHERE p.id = ?`,
      [pedidoId]
    );

    if (!pedidoRows || pedidoRows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    const { total, cliente_id } = pedidoRows[0];

    // 2. Crear la factura
    const [facturaResult] = await conn.query(
      `INSERT INTO facturas (cliente_id, total, metodo_pago)
       VALUES (?, ?, ?)`,
      [cliente_id, total, metodo_pago]
    );

    const facturaId = facturaResult.insertId;

    // 3. Obtener los detalles del pedido
    const [items] = await conn.query(
      `SELECT producto_id, cantidad, precio_unitario
       FROM detalles_pedido
       WHERE pedido_id = ?`,
      [pedidoId]
    );

    // 4. Insertar en items_factura
    for (const item of items) {
      await conn.query(
        `INSERT INTO items_factura (factura_id, producto_id, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [facturaId, item.producto_id, item.cantidad, item.precio_unitario]
      );
    }

    await conn.commit();
    return res.status(201).json({ message: "Factura creada correctamente", facturaId });

  } catch (error) {
    await conn.rollback();
    console.error("Error al crear factura:", error);
    return res.status(500).json({ error: "Error al crear la factura" });
  } finally {
    conn.release();
  }
};

// Obtener factura por ID
exports.obtenerFacturaPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const [factura] = await pool.query(
      `SELECT f.*, u.nombre AS cliente
       FROM facturas f
       JOIN usuarios u ON f.cliente_id = u.id
       WHERE f.id = ?`,
      [id]
    );

    const [items] = await pool.query(
      `SELECT i.*, p.nombre, p.marca
       FROM items_factura i
       JOIN productos p ON i.producto_id = p.id
       WHERE i.factura_id = ?`,
      [id]
    );

    res.json({ ...factura[0], items });
  } catch (error) {
    console.error("Error al obtener factura:", error);
    res.status(500).json({ error: "Error al obtener factura" });
  }
};
