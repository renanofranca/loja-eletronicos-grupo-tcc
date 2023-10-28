const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController');

router.post('/', VendaController.createVenda);
router.get('/:id', VendaController.get);
router.delete('/:id', VendaController.delete);
router.put('/:id', VendaController.update);
router.get('/', VendaController.getAll);

module.exports = router;