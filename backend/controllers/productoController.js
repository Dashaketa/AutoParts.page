// src/controllers/productoController.js
const pool = require('../config/db');
const path = require('path');
const fs = require('fs');

// Crear un producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      'INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio, imagen]
    );

    res.status(201).json({ id: result.insertId, mensaje: 'Producto creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear producto');
  }
};

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener productos');
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio } = req.body;

    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).send('Producto no encontrado');

    const productoActual = rows[0];
    let nuevaImagen = productoActual.imagen;

    if (req.file) {
      if (productoActual.imagen) {
        const rutaAnterior = path.join(__dirname, '..', 'uploads', productoActual.imagen);
        if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
      }
      nuevaImagen = req.file.filename;
    }

    await pool.query(
      'UPDATE productos SET nombre = ?, marca = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, peso = ?, costo_precio = ?, imagen = ? WHERE id = ?',
      [nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio, nuevaImagen, id]
    );

    res.send('Producto actualizado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar producto');
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT imagen FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).send('Producto no encontrado');

    const imagen = rows[0].imagen;
    if (imagen) {
      const ruta = path.join(__dirname, '..', 'uploads', imagen);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
    }

    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    res.send('Producto eliminado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar producto');
  }
};

// Crear múltiples productos
exports.crearProductosMasivos = async (req, res) => {
  try {
    const productos = req.body;

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: "Se requiere un arreglo de productos" });
    }

    const valores = productos.map(p => [
      p.nombre,
      p.marca,
      p.descripcion,
      parseInt(p.precio),
      parseInt(p.stock),
      p.categoria,
      parseFloat(p.peso),
      parseInt(p.costo_precio),
      null // imagen opcional
    ]);

    const sql = `
      INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio, imagen)
      VALUES ?
    `;

    await pool.query(sql, [valores]);

    res.status(201).json({ mensaje: 'Productos insertados correctamente', cantidad: productos.length });
  } catch (err) {
    console.error("Error en inserción masiva:", err);
    res.status(500).json({ error: "Error al insertar productos" });
  }
};
