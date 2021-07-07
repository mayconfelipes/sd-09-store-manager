const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

module.exports = router;
