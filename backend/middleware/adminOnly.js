// src/middleware/adminOnly.js
module.exports = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado: sólo admin' });
    }
    next();
  };
  