const ProductModel = require('../models/productModel');
const validateQuantity = require('../validations/products/validateQuantity');
const validateName = require('../validations/products/validateName');

const create = async (name, quantity) => {
  const wantedName = await ProductModel.findByName(name);
  const msgErrName = validateName.isValidName(name);
  const msgErrPosNumber = validateQuantity.isPositiveNumber(quantity);
  const msgErrIsNumber = validateQuantity.isValidNumber(quantity);

  if (msgErrName) return msgErrName;
  if (wantedName !== null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  if (msgErrPosNumber) return msgErrPosNumber;
  if (msgErrIsNumber) return msgErrIsNumber;

  return ProductModel.create(name, quantity);
};

const findAll = async () => {
  const products = await ProductModel.findAll();
  return products;
};

const findById = async (id) => {
  const product = await ProductModel.findById(id);

  if (product === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const update = async (id, name, quantity) => {
  const product = await ProductModel.update(id, name, quantity);
  const msgErrName = validateName.isValidName(name);
  const msgErrPosNumber = validateQuantity.isPositiveNumber(quantity);
  const msgErrIsNumber = validateQuantity.isValidNumber(quantity);

  if (msgErrName) return msgErrName;
  if (msgErrPosNumber) return msgErrPosNumber;
  if (msgErrIsNumber) return msgErrIsNumber;
  if (product === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};