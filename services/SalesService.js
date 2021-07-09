const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const productExists = async (id) => await ProductsModel.getById(id) ? null : true;

const isQuantityValid = (quantity) => {
  const ZERO = 0;

  return quantity <= ZERO || typeof quantity !== 'number' ? null : true;
};

const create = async (productsList) => {
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };

  if (!productExists(productsList[0].productId)) return error;
  if (!isQuantityValid(productsList[0].quantity)) return error;

  /*   
    const productsValidations = productsList
      .every(async ({ productId, quantity }) => {
        if (await !productExists(productId) || !isQuantityValid(quantity)) return false;
      });
  
    console.log(productsValidations);
  
    return !productsValidations ? error : await SalesModel.create(productsList); */

  const newSale = await SalesModel.create(productsList); // Interação com o Model

  return newSale;
};

const getAll = async () => {
  const salesList = await SalesModel.getAll(); // Interação com o Model

  return salesList;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }

  return sale;
};

const update = async (id, productsList) => {
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };

  if (!isQuantityValid(productsList[0].quantity)) return error;

  const updatedSale = await SalesModel.update(id, productsList);

  return updatedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
