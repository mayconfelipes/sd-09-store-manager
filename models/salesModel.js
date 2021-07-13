const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const createSale = async (itensSold) => {
  if (itensSold
    .map((item) => ObjectId.isValid(item.productId))
    .some((validation) => validation === false)) return false;
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  return newSale.ops[0];
};

const getAllSales = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  return connection().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, itensSold) => {
  if (itensSold
    .map((item) => ObjectId.isValid(item.productId))
    .some((validation) => validation === false)) return false;
  const updatedSale = await connection()
    .then((db) => db.collection('sales')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } },
        { returnOriginal: false }));
  return updatedSale.value;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const deletedSale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
