const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/:usuarioId', carritoController.obtenerCarrito);
router.post('/:usuarioId/agregar', carritoController.agregarAlCarrito);
router.delete('/:usuarioId/eliminar/:productoId', carritoController.eliminarDelCarrito);
router.put('/:usuarioId/actualizar', carritoController.actualizarCantidad);
router.post('/:usuarioId/vaciar', carritoController.vaciarCarrito);
router.post('/:usuarioId/finalizar', carritoController.finalizarCarrito);



module.exports = router;
