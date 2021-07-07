const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewProduct = (productData) => {
  const {_id, name, quantity } = productData;

  return {
    _id,
    name,
    quantity,
  };
};

const getProductName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({name}).toArray());
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({name, quantity})
      .then((result) => getNewProduct({_id: result.insertedId, name, quantity})));
};

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id)}, {$set: {name, quantity}})
      .then(() => getNewProduct({_id: id, name, quantity})));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection()
    .then((db) => db.collection('products').findOneAndDelete({_id: ObjectId(id)}));
};

module.exports = {
  createProduct,
  getProductName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
