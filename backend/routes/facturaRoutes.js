const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.post('/facturas', facturaController.crearFactura);
router.get('/facturas/:id/pdf', facturaController.generarPDF);

module.exports = router;