// src/controllers/pedidoController.js
const pool = require("../config/db");

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
