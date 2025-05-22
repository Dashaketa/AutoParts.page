const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta GET /usuarios
router.get('/', usuarioController.getUsuarios);

// Ruta POST /usuarios
router.post('/', usuarioController.createUsuario);

router.delete('/:id', usuarioController.eliminarUsuario);


module.exports = router;