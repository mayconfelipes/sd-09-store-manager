const Products = require('../model/Products');

const checkNameLength = (name) => {
  const minNameLength = 5;
  if (name.length < minNameLength) {
    throw { 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      status: 422,
    };
  }
};

const checkQuantity = (quantity) => {
  if (quantity < 1) {
    throw { 
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
      status: 422,
    };
  }
};

const checkQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    throw { 
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      },
      status: 422,
    };
  }
};

const checkProductIsValid = (name, quantity) => {
  checkNameLength(name);
  checkQuantity(quantity);
  checkQuantityType(quantity);
};

const checkIfNameExists = async (name) => {
  const isProduct = await Products.findByName(name);

  if (isProduct) {
    throw { 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      },
      status: 422,
    };
  }
};


const createNewProduct = async (name, quantity) => {
	 await checkIfNameExists(name);
	 checkProductIsValid(name, quantity); 
 	const newProduct = await Products.createNewProduct(name, quantity);
  return {
    status: 201,
    newProduct
  };
};

module.exports = {
  createNewProduct,
};