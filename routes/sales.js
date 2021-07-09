const express = require('express');
const sales = require('../controllers/sales');
const { checkSale, checkSaleId } = require('../middlewares/validators');

const route = express.Router();

route.post('/', checkSale, sales.create);
route.get('/', sales.getAll);
route.get('/:id', sales.getById);
route.put('/:id', checkSale, sales.update);
route.delete('/:id', checkSaleId, sales.remove);

module.exports = route;
