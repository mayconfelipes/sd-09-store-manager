const productModel = require('../model/productModel');

const validateNewProduct = async (name, quantity) => {
  const minNameLength = 5;
  const minQuantity = 0;
  const product = await productModel.getProductByName(name);

  if(name.length < minNameLength) return { 
    err: { 
      message: '"name" length must be at least 5 characters long',
      code: 'invalid_data'
    } 
  };

  if (product) return {
    err: { 
      message: 'Product already exists',
      code: 'invalid_data'
    } 
  };

  if (quantity <= minQuantity) return {
    err: { 
      message: '"quantity" must be larger than or equal to 1',
      code: 'invalid_data'
    }
  };

  if (typeof quantity !== 'number') return {
    err: { 
      message: '"quantity" must be a number',
      code: 'invalid_data'
    }
  };

  return product;
};

const getAllProducts =  async () => {
  return await productModel.getAll();
};

const findProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return {
    err: { 
      message: 'Wrong id format',
      code: 'invalid_data'
    }
  };

  return product;
};

module.exports = { validateNewProduct, getAllProducts, findProductById };
