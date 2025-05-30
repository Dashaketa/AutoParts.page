const express = require('express');
const router = express.Router();
const carritoTemporalController = require('../controllers/carritoTemporalController');

router.post('/', carritoTemporalController.guardarCarritoTemporal);

module.exports = router;
