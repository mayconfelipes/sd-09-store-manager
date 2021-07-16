const salesModel = require('../models/salesModels');
const { ObjectID } = require('mongodb');

const registerSales = (sales) => {
  return salesModel.registerSales(sales);
};

const listAll = () => {
  return salesModel.listAll();
};

const listSaleId = (id) => {
  return salesModel.listSaleId(ObjectID(id));
};

const editSale = async (id, products) => {

  const zero = 0;
  // pelo corpo da requisição ser um array, é necessário percorrer cada campo da requisição, para alterar oque foi solicitado
  for(let index = zero; index < products.length; index++){
    const idProd = products[index].productId;
    const qtyProd = products[index].quantity;
    const teste = await salesModel.editSale(ObjectID(id), idProd, qtyProd);
    console.log("oi" + teste);
  }
  return salesModel.listSaleId(ObjectID(id));
};

module.exports = {
  registerSales,
  listAll,
  listSaleId,
  editSale,
};
