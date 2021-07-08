const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const services = require('../services/products');
const { CREATED, UNPROCESSED } = require('../constants/httpCodes.json');

const create = rescue(async (request, response, next) => {

  const { name, quantity } = request.body;

  const newProduct = await services.create({ name, quantity });

  if (newProduct.err) next(err);

  response.status(CREATED).json({
    _id: newProduct,
    name,
    quantity,
  });
});

module.exports = {
  create,
};
