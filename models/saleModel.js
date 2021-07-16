const connection = require('./connection');
const { ObjectId } = require('mongodb');

const hexValue = 24;

const create = async (product) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: [...product] }));

  return sale.ops[0];
};

const showAll = async () => {
  const list = await connection()
    .then((db) => db.collection('sales').find({}).toArray());

  return list;
};

const findId = async (id) => {
  if(id.length !== hexValue) return null;

  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: new ObjectId(id) }));

  return sale;
};

const update = async (id, product) => {
  const sale = await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: new ObjectId(id)}, { $set: { itensSold: product } }));

  const revisionSale = await connection()
    .then((db) => db.collection('sales').findOne({ _id: new ObjectId(id) }));

  console.log(revisionSale)

  return sale && revisionSale;
};

module.exports = {
  create,
  showAll,
  findId,
  update,
};