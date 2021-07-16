const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// db local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// db trybe
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => db = conn.db(DB_NAME))
      .catch((err) => console.error(err));
};

module.exports = connection;
