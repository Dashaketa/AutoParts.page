// app.js
const express   = require('express');
const cors      = require('cors');
const path      = require('path');
require('dotenv').config();
const multer    = require('multer');

const pool            = require('./config/db');
const usuarioRoutes   = require('./routes/usuarioRoutes');
const productoRoutes  = require('./routes/productoRoutes');
const pedidoRoutes    = require('./routes/pedidoRoutes');
const authRoutes      = require('./routes/authRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const carritoTemporalRoutes = require('./routes/carritoTemporalRoutes');
const facturaRoutes = require('./routes/facturaRoutes');



const app = express();

// 1) Habilitar CORS (modo abierto)
// 1) Habilitar CORS (soporta frontend minorista y mayorista)
const allowedOrigins = [
  'http://localhost:5173', // minorista
  'http://localhost:4000', // mayorista (o el puerto que uses)
  'http://localhost:4001', // mayorista (o el puerto que uses)

];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir sin problema en llamadas como Postman o backend interno
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


const session = require('express-session');

app.use(session({
  secret:   process.env.SESSION_SECRET || 'un-secreto-muy-seguro',
  resave:   false,
  saveUninitialized: true,
  cookie:   { secure: false } // en prod pasa a true si usas HTTPS
}));


// 2) Parseo de JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 4) Servir archivos subidos por Multer
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });
app.set('upload', upload);

// 5) Archivos estáticos de la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// 6) Rutas CRUD existentes
app.use('/usuarios',  usuarioRoutes);
app.use('/productos', productoRoutes);
app.use('/pedido',    pedidoRoutes);
app.use('/auth',     authRoutes);
app.use('/carrito', carritoRoutes);
app.use('/carrito-temporal', carritoTemporalRoutes);
app.use('/api', facturaRoutes);



// 7) Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API de AutoParts funcionando');
});

// 8) Transbank
app.use('/api/transbank', require('./src/routes/transbankRoutes'))


module.exports = app;
