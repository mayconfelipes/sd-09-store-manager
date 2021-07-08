const Products = require('../models/products');
const rescue = require('express-rescue');

const create = rescue(async (name, quantity) => {

  const existingProduct = await Products.findByName(name);

  if (existingProduct) return { err: { message: 'Product already exists'}};

  return Products.create(name, quantity);
});

module.exports = { create };
