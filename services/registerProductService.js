const Joi = require('@hapi/joi');
const { 
  registerProductModel,
  existsProduct,
} = require('../models/productsModel');

const { 
  invalidProduct,
  alreadyExists
} = require('../dictionary/dictionaryError');
const { httpStatusCode: { unprocessableEntity } } = require('../utils');

const minLength = 5;
const minQuantity = 1;

const productSchema = Joi.object({
  name: Joi.string()
    .min(minLength)
    .required(),

  quantity: Joi.number()
    .integer()
    .min(minQuantity)
    .required()
});

const registerProductService = async (name, quantity) => {
  const { error } = productSchema
    .validate({name, quantity});
  if (error) throw invalidProduct(unprocessableEntity, 'invalid_data', error.message);
  
  if (await existsProduct(name)) throw alreadyExists();

  const response = await registerProductModel(name, quantity);
  return response;
};

module.exports = { registerProductService };
