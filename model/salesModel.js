const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const createSale = async (itensSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  
  return {
    _id: newSale.insertedId,
    itensSold,
  };
};

const findSaleById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, items) => {
  console.log(`id no model: ${id}`);
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: id },
      { $set: { itensSold: items }},
      { upsert: true }
    ));
};

module.exports = { createSale, findSaleById, updateSale };