const express = require('express');
const ProductsService = require('../services/ProductsService');
const {validatorNameAndQuant, validatorId} = require('../middlewares/validatorProduct');
const statusSucessCreate = 201;
const statusSucess = 200;

const ProductsRouter = express.Router();

ProductsRouter.get('/', async (_req, res, _next) => {
  const allProducts = await ProductsService.getAllProducts();

  return res.status(statusSucess).json({ products: allProducts });
});

ProductsRouter.get('/:id', validatorId, async (req, res, _next) => {
  const { id } = req.params;
  const product = await ProductsService.findById(id);

  return res.status(statusSucess).json(product);
});

ProductsRouter.post('/', validatorNameAndQuant, async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.createProduct(name, quantity);

  if (product.err) return next(product.err);

  return res.status(statusSucessCreate).json(product);
});

module.exports = ProductsRouter;
