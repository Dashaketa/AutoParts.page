const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { upload } = require('../middleware/upload');

// Crear producto
router.post('/', upload.single('imagen'), productoController.crearProducto);

// Crear productos masivos
router.post("/carga-masiva", productoController.crearProductosMasivos);


// Listar productos
router.get('/', productoController.getProductos);

// Eliminar producto
router.delete('/:id', productoController.eliminarProducto);

// Actualizar producto
router.put('/:id', upload.single('imagen'), productoController.actualizarProducto);

// Obtener un producto por ID (nueva ruta)
router.get('/:id', productoController.getProductoById);

module.exports = router;
