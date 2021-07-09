const Products = require('../models/Products');

const validateLength = async (name) => {
  const nameLength = 5;
  if (name.length < nameLength) return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  };
  return name;
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number') return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  };
  if (quantity < 1) return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  };
  return quantity;
};

const newProduct = async ({ name, quantity }) => {
  const productName = await validateLength(name);
  const productExists = await Products.getProduct({ name });
  if (productExists !== null) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };
  const productQuantity = validateQuantity(quantity);
  if (productName.err) {
    return productName;
  }
  if (productQuantity.err) {
    return productQuantity;
  }
  const product = await Products.addNewProduct(productName, productQuantity);
  return product;
};

const getAll = async () => {
  const products = await Products.getAll();
  return products;
};

const getOne = async (id) => {
  const product = await Products.getOne(id);

  if (!product) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };

  return product;
};

const updateProduct = async (data) => {
  const productName = await validateLength(data.name);
  const productQuantity = validateQuantity(data.quantity);
  if (productName.err) {
    return productName;
  }
  if (productQuantity.err) {
    return productQuantity;
  }
  const product = await Products.updateProduct(data);
  
  if (!product) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };

  return product;
};

const deleteProduct = async (id) => {
  const product = await Products.getOne(id);
  if (!product) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  await Products.deleteProduct(id);
  return product;
};

module.exports = {
  newProduct,
  getAll,
  getOne,
  updateProduct,
  deleteProduct,
};