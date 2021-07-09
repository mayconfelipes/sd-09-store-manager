const { ObjectId } = require('mongodb');
const connection = require('./connection');

function addNewProduct (name, quantity) {
  return connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }))
	  .then(({ ops }) => ops[0]);
}

const getProduct = async(name) => {
  return connection().then((db) => db.collection('products')
    .findOne(name))
    .then((product) => product);
};

const getAll = async() => {
  return connection().then((db) => db.collection('products')
    .find().toArray())
    .then((products) => products);
};

const getOne = async(id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products')
    .findOne({ _id: ObjectId(id) }))
    .then((products) => products);
};

const updateProduct = async({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
      { returnOriginal: false }
    ));
};

const deleteProduct = async(id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) },
    ));
};

module.exports = {
  addNewProduct,
  getProduct,
  getAll,
  getOne,
  updateProduct,
  deleteProduct,
};