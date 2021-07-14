const { ObjectId } = require('mongodb');
const { validateSaleId } = require('../middlewares/salesMiddleware');
const products = require('../models/products');
const sales = require('../models/sales');

const errorMessage = {
  saleInvalidData: 'Wrong sale ID format',
  quantityTooLow: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  saleNotFound: 'Sale not found',
  invalidData: 'Wrong product ID or invalid quantity',
};

const errorCode = {
  invalid_data: 'invalid_data',
  not_found: 'not_found',
};

const responseCode = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const fieldMinValues = {
  quantity: 1,
};

const isBlank = (value) => (!value);
const isString = (value) => (typeof value === 'string');
const isLowerthanMinValue = (value, min) => (value < min);
const idIsNotValid = (id) => {
  if(!ObjectId.isValid(id)) {
    return { response: responseCode.notFound,
      err: { code: errorCode.not_found, message: errorMessage.saleNotFound } };
  }
};

const productExists = async (productId) => {
  const product = await products.findById(productId);
  if (!product) return false;
  return true;
};

const saleExists = async (saleId, method) => {
  if (!ObjectId.isValid(saleId)) {
    return { response: responseCode.unprocessableEntity,
      err: { code: errorCode.invalid_data, message: errorMessage.saleInvalidData } };
  }
  const sale = await sales.findById(saleId);
  if (!sale && method === 'DELETE') {
    return { response: responseCode.unprocessableEntity,
      err: { code: errorCode.invalid_data, message: errorMessage.saleInvalidData } };
  }
  if (!sale) {
    return { response: responseCode.notFound,
      err: { code: errorCode.not_found, message: errorMessage.saleNotFound } };
  }
};

const validateSale = ({ productId, quantity }) => {
  if(
    isString(quantity)
    ||
    isLowerthanMinValue(quantity, fieldMinValues.quantity)
    ||
    isBlank(productId)
    ||
    idIsNotValid(productId)
    ||
    !productExists(productId)
  ) {
    return { response: responseCode.unprocessableEntity,
      err: { code: errorCode.invalid_data, message: errorMessage.invalidData } };
  }
};
module.exports = {
  validateSale,
  idIsNotValid,
  productExists,
  saleExists,
  errorMessage,
  errorCode,
  responseCode
};
