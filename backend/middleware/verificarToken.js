// src/middleware/verificarToken.js
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Acepta “Bearer <token>” o bien “<token>”
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '12009jjdjDJJWL2');
    // Mapea el payload a userId y rol
    req.usuario = {
      userId: decoded.id,   // tu JWT incluye “id”
      rol:    decoded.rol,  // y “rol”
    };
    return next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = verificarToken;
