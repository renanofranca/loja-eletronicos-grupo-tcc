const express = require('express');
const router = express.Router();
const ProdutosController = require('../controllers/ProdutosController');

router.post('/', ProdutosController.create);
router.get('/:id', ProdutosController.get);
router.delete('/:id', ProdutosController.delete);
router.put('/:id', ProdutosController.update);
router.get('/', ProdutosController.getAll);

module.exports = router;