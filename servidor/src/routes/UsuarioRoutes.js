const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/', UsuarioController.createUser);
router.post('/login', UsuarioController.authenticate);
router.get('/:id', UsuarioController.get);
router.delete('/:id', UsuarioController.delete);
router.put('/:id', UsuarioController.update);

module.exports = router;