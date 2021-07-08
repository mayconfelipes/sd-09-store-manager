const salesModel = require('../models/salesModel');

const postNewSale = async (array) => {
  const result = await salesModel.postNewSale(array);

  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Não existe produto com o Id fornecido'
    },
  };

  return result;
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();

  return result;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);

  if (!result) return ({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  });

  return result;
};

const updateSale = async ({ id, itensSold }) => {
  const result = await salesModel.updateSale({ id, itensSold });

  return result;
};

module.exports = {
  postNewSale,
  getAllSales,
  getSaleById,
  updateSale,
};
