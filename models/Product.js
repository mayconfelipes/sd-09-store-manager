// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  if (!product) return null;

  return product;
};

const create = async (name, quantity) => await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

module.exports = {
  create,
  findByName,
};