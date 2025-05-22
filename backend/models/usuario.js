const pool = require('../config/db');

const Usuario = {
  async crear(nombre, email, contraseñaHash, rol = 'cliente') {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, contraseñaHash, rol]
    );
    return result.insertId;
  },

  async obtenerPorEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }
};

module.exports = Usuario;