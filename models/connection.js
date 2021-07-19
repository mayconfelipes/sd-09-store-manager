const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => MongoClient
  .connect(MONGO_DB_URL, OPTIONS)
  .then((connect) => connect.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
