const bcrypt = require('bcrypt');
const pool = require('../config/db');

exports.createUsuario = async (req, res) => {
  try {
    console.log("Datos recibidos en backend:", req.body); // Debug
    
    const { nombre, email, contraseña, rol } = req.body;
    
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const contraseñaHash = await bcrypt.hash(contraseña, 10);
    
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, contraseñaHash, rol || 'cliente'] // Valor por defecto para rol
    );
    
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT id, nombre, email, rol, fecha_creacion FROM usuarios');
    res.json(usuarios);
  } catch (err) {
    console.error("Error en getUsuarios:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.status(200).send('Usuario eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

