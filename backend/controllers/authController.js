const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Asegúrate que esta sea tu conexión

exports.login = async (req, res) => {
  try {
    console.log("Body recibido en login:", req.body);

    const { email, contraseña } = req.body;


    if (!email || !contraseña) {
      return res.status(400).json({ error: "Faltan email o contraseña" });
    }

    // 1. Buscar usuario por email
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    const usuario = rows[0];
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // 2. Comparar contraseña ingresada con la hasheada
    const coincide = await bcrypt.compare(contraseña, usuario.contraseña_hash);
    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 3. Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || "12009jjdjDJJWL2", // pon un secreto real en producción
      { expiresIn: "1h" } // dura 1 hora
    );

    // 4. Enviar respuesta con token
    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
