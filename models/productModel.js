const connection = require('./connection');
const { ObjectId } = require('mongodb');
const DB_COLLECTION = 'products';

const insertProduct = async (name, quantity) => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).insertOne({name, quantity})
      .then((response) => response.ops[0]));

  return request;
};

const getAllData = async () => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).find().toArray());

  const response = {
    'products': request
  };

  return response;
};

const getProduct = async (id) => {

  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id)}));

  return request;
};

const editProductData = async (name, quantity, id) => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION)
      .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } })
      .then(() => ({ _id: id, name, quantity }))
  );

  return request;
};

const deleteData = async (id) => {
  const response = await getProduct(id);
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).deleteOne({ _id: ObjectId(id)}).then(() => response));
  console.log(response);
  return(request);
};

module.exports = {
  insertProduct,
  getAllData,
  getProduct,
  editProductData,
  deleteData,
};
