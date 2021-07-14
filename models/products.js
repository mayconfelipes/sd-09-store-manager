const connection = require('./connection');
const { ObjectID } = require('mongodb');

const create = (product) => connection().then((db) =>
  db.collection('products').insertOne(product)).then(({ ops }) => ops[0]);

const getAll = () => connection().then((db) =>
  db.collection('products').find().toArray());

const getById = (id) => connection().then((db) =>
  db.collection('products').findOne(ObjectID(id)));

const getByName = (name) => connection().then((db) =>
  db.collection('products').findOne({ name }));

const update = (id, product) => connection().then((db) =>
  db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: product }));

const remove = (id) => connection().then((db) =>
  db.collection('products').findOneAndDelete({ _id: ObjectID(id) }))
  .then(({ value }) => value);

module.exports = { create, getAll, getById, getByName, update, remove };
