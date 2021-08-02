const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.products.addProduct);
router.get('/', Controller.products.getProducts);

router.get('/:id', Controller.products.getProductById);
router.put('/:id', Controller.products.updateProduct);
router.delete('/:id', Controller.products.deleteProduct);

module.exports = router;
