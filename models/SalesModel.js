const connection = require('./connection');
const { ObjectId } = require('mongodb');


const addSale = async (soldItens) => {
  const data = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: soldItens}));

  return data;
};

const getAllSales = async () => {
  const data = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return {
    sales: data,
  };
};

const findById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (!sale) return null;

  return sale;
};

const checkIfSalesExist = async ({id}) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({id}));

  if (!sale) return null;

  return sale;
};

const editSale = async ({id, itensSold}) => {
  const newSale = await connection()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold } },
      ));
  return { _id: id, itensSold };
};

const deleteSale = async (id) => {
  const deleted = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return deleted;
};

module.exports = {
  checkIfSalesExist,
  getAllSales,
  deleteSale,
  findById,
  editSale,
  addSale,
};
