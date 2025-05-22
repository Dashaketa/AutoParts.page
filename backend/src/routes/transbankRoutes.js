// src/routes/transbankRoutes.js
const express = require('express')
const router  = express.Router()
const tbCtrl  = require('../controllers/transbankController')

// Iniciar pago
// POST http://localhost:3000/api/transbank/init
router.post('/init',  tbCtrl.initTransaction)
// Callback Webpay
// GET  http://localhost:3000/api/transbank/commit?token_ws=...
router.get('/commit', tbCtrl.commitTransaction)

module.exports = router
