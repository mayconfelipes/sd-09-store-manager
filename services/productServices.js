const product = require('../models/productModel');
const validation = require('../validation');

const createProduct = async (name, quantity) => {
  const unique = await validation.isUnique(name);

  if (!validation.isValidName(name)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    };
  };

  if (!validation.isInteger(quantity)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    };
  };

  if (!validation.isNumber(quantity)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      }
    };
  };

  console.log(unique);
  if (!unique) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': 'Product already exists'
      }
    };
  }

  const newProduct = await product.createProduct(name, quantity);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  const item = await product.updateProduct(id, name, quantity);
  return item;
};

const deleteProduct = async (id) => {
  const item = await product.deleteProduct(id);
  return item;
};

const listProduct = async (id) => {
  const list = await product.listProduct(id);
  return list;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  listProduct
};