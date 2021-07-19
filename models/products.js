const connection = require('./connection');

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const nameProduct = async (name) => {
  const db = await connection();
  const findName = db.collection('products').findOne({name});
  return findName;
};

const isValidName = (name) => {
  const tamanhoName = 5;
  console.log(typeof name);
  if(!name || typeof name !== 'string' || name.length < tamanhoName) return false;
  return true;
};

const isValidQuantitPositivo = (quantity) => {
  if(parseInt(quantity) < 1 ) return false;
  return true;
};

const isvalidQuantityIsNumber = (quantity) => {
  if(!quantity || typeof quantity !== 'number') return false;
  return true; 
};


const getProducts = async () => {
  const db = await connection();
  const mostraProduto = db.collection('products').find().toArray();
  return mostraProduto;
};

module.exports = { 
  createProduct, 
  getProducts, 
  isValidName, 
  nameProduct, 
  isvalidQuantityIsNumber,
  isValidQuantitPositivo, 
};
