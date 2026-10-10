// src/routes/pedidoRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/pedidoController");

// Crear pedido
// POST /api/pedidos
router.post("/pedidos", ctrl.crearPedido);

// Listar todos (admin)
// GET /api/pedidos
router.get("/pedidos", ctrl.obtenerTodosLosPedidos);

// Listar pedidos de un usuario
// GET /api/pedidos/usuario/:usuarioId
router.get("/pedidos/usuario/:usuarioId", ctrl.obtenerPedidosUsuario);

// Detalle de un pedido
// GET /api/pedidos/:pedidoId
router.get("/pedidos/:pedidoId", ctrl.obtenerDetallePedido);

// Actualizar un pedido
// PUT /api/pedidos/:pedidoId
router.put("/pedidos/:pedidoId", ctrl.actualizarPedido);

// Cancelar (estado) un pedido
// DELETE /api/pedidos/:pedidoId
router.delete("/pedidos/:pedidoId", ctrl.eliminarPedido);

// Generar PDF de un pedido
router.get('/pdf/:id', ctrl.generarPedidoPDF);

// Nuevas rutas para el dashboard
router.get("/top-productos", ctrl.getTopProductos); // Top 5 productos
router.get("/filtro", ctrl.getPedidosFiltrados); // Pedidos con filtros

router.get('/pedidos/:pedidoId/factura', ctrl.generarFacturaPDF);
router.get('/pedidos/:id/factura-detalle', ctrl.obtenerDetallesFactura);
router.post("/facturas/crear/:pedidoId", ctrl.crearFacturaDesdePedido);
router.get("/facturas/:id", ctrl.obtenerFacturaPorId);



module.exports = router;
