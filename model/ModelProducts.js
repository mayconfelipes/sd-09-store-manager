const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({ name, quantity }) => {
  const connect = await connection();
  const createProduct = await connect.collection('products')
    .insertOne({ name, quantity });

  return {
    _id: createProduct.insertedId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const connect = await connection();
  const findName = await connect.collection('products').findOne({ name });

  return findName;
};

const getAll = async () => {
  const connect = await connection();
  const findAll = await connect.collection('products').find().toArray();

  return {
    products: [ ...findAll ],
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const findProduct = await connect.collection('products').findOne({ _id: ObjectId(id) });

  return findProduct;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
};
