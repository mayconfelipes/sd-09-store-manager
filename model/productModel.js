const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const getProductByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

module.exports = { createProduct, getProductByName, getAll, getProductById };
