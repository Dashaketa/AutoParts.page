// server.js
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

// Test de conexión
pool.getConnection()
  .then(conn => {
    console.log('✅ Conectado a MySQL');
    conn.release();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL:', err.message);
  });
