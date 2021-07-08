const connection = require('./connection');
const { ObjectId } = require('mongodb');

const DB_COLLECTION = 'sales';

const create = async (productsList) => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const newSale = await SalesCollection
    .insertMany([{ itensSold: [...productsList] }]); // Interação com o DB

  return newSale.ops[0];
};

const getAll = async () => {
  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const salesList = await SalesCollection
    .find().toArray(); // Interação com o DB

  return salesList;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const SalesCollection = await connection()
    .then((db) => db.collection(DB_COLLECTION));

  const foundSale = await SalesCollection
    .findOne({ _id: ObjectId(id) }); // Interação com o DB

  return foundSale;  
};

module.exports = {
  create,
  getAll,
  getById,
};
