const pool = require('../config/db');

// Obtener carrito actual del usuario
exports.obtenerCarrito = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    // 1. Verificar si ya existe un carrito "abierto"
    const [carrito] = await pool.query(
      "SELECT id FROM carritos WHERE usuario_id = ? AND estado = 'abierto' LIMIT 1",
      [usuarioId]
    );

    if (carrito.length === 0) {
      return res.status(200).json({ carrito: [], total: 0 });
    }

    const carritoId = carrito[0].id;

    // 2. Obtener items del carrito
    const [items] = await pool.query(
      `SELECT ci.id AS item_id, p.nombre, p.imagen, ci.producto_id, ci.cantidad, ci.precio_unitario,
              (ci.cantidad * ci.precio_unitario) AS subtotal
       FROM carrito_items ci
       JOIN productos p ON ci.producto_id = p.id
       WHERE ci.carrito_id = ?`,
      [carritoId]
    );

    // 3. Calcular total
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ carrito: items, total });
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Agregar producto al carrito
exports.agregarAlCarrito = async (req, res) => {
  const { usuarioId } = req.params;
  const { productoId, cantidad } = req.body;

  try {
    // 1. Verificar si ya existe un carrito abierto
    let [carrito] = await pool.query(
      "SELECT id FROM carritos WHERE usuario_id = ? AND estado = 'abierto' LIMIT 1",
      [usuarioId]
    );

    let carritoId;

    if (carrito.length === 0) {
      // Crear nuevo carrito
      const [nuevo] = await pool.query(
        "INSERT INTO carritos (usuario_id) VALUES (?)",
        [usuarioId]
      );
      carritoId = nuevo.insertId;
    } else {
      carritoId = carrito[0].id;
    }

    // 2. Obtener precio del producto
    const [producto] = await pool.query(
      "SELECT precio FROM productos WHERE id = ?",
      [productoId]
    );

    if (producto.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const precio = producto[0].precio;

    // 3. Verificar si el producto ya está en el carrito
    const [existe] = await pool.query(
      "SELECT id, cantidad FROM carrito_items WHERE carrito_id = ? AND producto_id = ?",
      [carritoId, productoId]
    );

    if (existe.length > 0) {
      // Si existe, actualizar la cantidad
      const nuevaCantidad = existe[0].cantidad + cantidad;
      await pool.query(
        "UPDATE carrito_items SET cantidad = ? WHERE id = ?",
        [nuevaCantidad, existe[0].id]
      );
    } else {
      // Si no, insertar nuevo producto
      await pool.query(
        "INSERT INTO carrito_items (carrito_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
        [carritoId, productoId, cantidad, precio]
      );
    }

    res.status(201).json({ mensaje: "Producto agregado al carrito" });
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

//ELiminar del carrito
exports.eliminarDelCarrito = async (req, res) => {
    const { usuarioId, productoId } = req.params;
  
    try {
      // Obtener carrito activo del usuario
      const [carrito] = await pool.query(
        "SELECT id FROM carritos WHERE usuario_id = ? AND estado = 'abierto' LIMIT 1",
        [usuarioId]
      );
  
      if (carrito.length === 0) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const carritoId = carrito[0].id;
  
      // Eliminar el producto del carrito
      const [resultado] = await pool.query(
        "DELETE FROM carrito_items WHERE carrito_id = ? AND producto_id = ?",
        [carritoId, productoId]
      );
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no estaba en el carrito' });
      }
  
      res.json({ mensaje: 'Producto eliminado del carrito' });
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
// Actualizar cantidad de un producto en el carrito
  exports.actualizarCantidad = async (req, res) => {
    const { usuarioId } = req.params;
    const { productoId, cantidad } = req.body;
  
    try {
      if (cantidad <= 0) {
        return res.status(400).json({ error: 'Cantidad inválida' });
      }
  
      const [carrito] = await pool.query(
        "SELECT id FROM carritos WHERE usuario_id = ? AND estado = 'abierto' LIMIT 1",
        [usuarioId]
      );
  
      if (carrito.length === 0) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const carritoId = carrito[0].id;
  
      const [resultado] = await pool.query(
        "UPDATE carrito_items SET cantidad = ? WHERE carrito_id = ? AND producto_id = ?",
        [cantidad, carritoId, productoId]
      );
  
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
      }
  
      res.json({ mensaje: 'Cantidad actualizada' });
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
// Vaciar el carrito del usuario  
  exports.vaciarCarrito = async (req, res) => {
    const { usuarioId } = req.params;
  
    try {
      const [carrito] = await pool.query(
        "SELECT id FROM carritos WHERE usuario_id = ? AND estado = 'abierto' LIMIT 1",
        [usuarioId]
      );
  
      if (carrito.length === 0) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const carritoId = carrito[0].id;
  
      await pool.query("DELETE FROM carrito_items WHERE carrito_id = ?", [carritoId]);
  
      res.json({ mensaje: 'Carrito vaciado' });
    } catch (err) {
      console.error('Error al vaciar carrito:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
// Finalizar el carrito y crear un pedido
  exports.finalizarCarrito = async (req, res) => {
    const { usuarioId } = req.params;
  
    const conn = await pool.getConnection();
  
    try {
      await conn.beginTransaction();
  
      // 1. Obtener carrito abierto
      const [carritoRows] = await conn.query(
        "SELECT id FROM carritos WHERE usuario_id = ? AND estado = 'abierto' LIMIT 1",
        [usuarioId]
      );
  
      if (carritoRows.length === 0) {
        await conn.release();
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const carritoId = carritoRows[0].id;
  
      // 2. Obtener items del carrito
      const [items] = await conn.query(
        "SELECT producto_id, cantidad, precio_unitario FROM carrito_items WHERE carrito_id = ?",
        [carritoId]
      );
  
      if (items.length === 0) {
        await conn.release();
        return res.status(400).json({ error: 'El carrito está vacío' });
      }
  
      // 3. Calcular total
      const total = items.reduce((sum, item) => sum + item.cantidad * item.precio_unitario, 0);
  
      // 4. Crear pedido
      const [pedidoResult] = await conn.query(
        "INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)",
        [usuarioId, total]
      );
  
      const pedidoId = pedidoResult.insertId;
  
      // 5. Insertar detalles del pedido
      for (const item of items) {
        await conn.query(
          `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
           VALUES (?, ?, ?, ?)`,
          [pedidoId, item.producto_id, item.cantidad, item.precio_unitario]
        );
      }
  
      // 6. Marcar carrito como comprado
      await conn.query(
        "UPDATE carritos SET estado = 'comprado' WHERE id = ?",
        [carritoId]
      );
  
      await conn.commit();
      conn.release();
  
      res.status(201).json({ mensaje: 'Pedido generado correctamente', pedidoId, total });
  
    } catch (err) {
      await conn.rollback();
      conn.release();
      console.error('Error al finalizar el carrito:', err);
      res.status(500).json({ error: 'Error al generar el pedido' });
    }
  };
  