const productModel = require('../Models/functions');
const util = require('../utils');
const joi = require('@hapi/joi');
const num = 0;
const status = 422;
const mim = 5;

const validetionProduction = joi.object({
  name: joi.string().min(mim),
  quantity: joi.number().integer().min(1),
});

async function create(name, quantity) {
  const { error } = validetionProduction.validate({ name, quantity });
  const retorneName = await productModel.findProductName(name);

  if (error) {
    const { message } = error.details[0];
    throw  util(status, 'invalid_data', message);
  }

  if(retorneName.length > num) throw util(
    status, 'invalid_data', 'Product already exists'
  );

  const retorneCreate = await productModel.create(name, quantity);
  return retorneCreate.ops[0];
}

module.exports = {
  create,
};
