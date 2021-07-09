const productModel = require('../models/productModel');

const findAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await productModel.getById(id);

  return product;
};

const create = async (name, quantity,) => {
  const product = await productModel.getByName(name);

  if (product) {
    throw {
      customError: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  };

  const newProduct = await productModel.create(name, quantity);

  return newProduct;
};

module.exports = { 
  findAll,
  findById,
  create, 
};
