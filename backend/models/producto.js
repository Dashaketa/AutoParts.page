const pool = require('../config/db');

const Producto = {
// Crear un producto (ahora incluye marca, peso, costo_precio)
crear: async ({ nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio, imagen }) => {
const sql = "INSERT INTO productos (nombre, marca, descripcion, precio, stock, categoria, peso, costo_precio, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
const [result] = await pool.query(sql, [
nombre,
marca,
descripcion,
precio,
stock,
categoria,
peso,
costo_precio,
imagen
]);

bash
Copiar
Editar
return {
  id: result.insertId,
  nombre,
  marca,
  descripcion,
  precio,
  stock,
  categoria,
  peso,
  costo_precio,
  imagen
};
},

// Obtener todos los productos
obtenerTodos: async () => {
const [rows] = await pool.query('SELECT * FROM productos');
return rows;
},

// Eliminar producto por ID
eliminar: async (id) => {
const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
return result.affectedRows > 0;
}
};