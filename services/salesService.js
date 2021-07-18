const { createSales, getAllSales, getByIdSale } = require('../models/salesModel');

const { validNumber, validQuantity, validSearch } = require('./salesValidations');

const OK_STATUS = 200;

const create = async (newSales) => {
  validQuantity(newSales);
  validNumber(newSales);
  const result = await createSales(newSales);
  return { status: OK_STATUS, result };
};

const allSales = async () => {
  const result = await getAllSales();
  return { status: OK_STATUS, result };
};

const getById = async (id) => {
  const result = await getByIdSale(id);
  validSearch(result);
  return { status: OK_STATUS, result };
};

module.exports = {
  allSales,
  create,
  getById,
};
