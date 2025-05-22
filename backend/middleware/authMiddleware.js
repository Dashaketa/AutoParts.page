const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '12009jjdjDJJWL2');
    req.usuario = decoded; // agrega info del usuario al request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = verificarToken;
