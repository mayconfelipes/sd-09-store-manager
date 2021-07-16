const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const productsModel = require('../../models/products');
const salesModel = require('../../models/sales');
const newProduct = {
  name: 'Produto Silva',
  quantity: 10,
};

const newSale = [
  {
    "productId": "5f43ba273200020b101fe49f",
    "quantity": 2
  }
];

const updateSale = [
  {
    "productId": "5f3ff849d94d4a17da707008",
    "quantity": 3
  }
]

const updateProduct = {
  name: 'Produto do Batista',
  quantity: 20,
};

describe('Insert a new product', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('When insertion is successful', () => {
    it('Should returns an object', async () => {
      const product = await productsModel.create(newProduct);
      expect(product).to.be.a('object');
    });
    it('Should have an ID attribute', async () => {
      const product = await productsModel.create(newProduct);
      expect(product).to.have.a.property('insertedId');
    });
  });


});

describe('Insert a new sale', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    MongoClient.connect.restore();
  });
  describe('When insertion is successful', () => {
    it('Should returns an object', async () => {
      sale = await salesModel.create(newSale);
      expect(sale).to.be.a('object');
    });
    it('Should have an ID attribute', async () => {
      sale = await salesModel.create(newSale);
      expect(sale).to.have.a.property('insertedId');
    });
  });

});

describe('Get all products', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after( () => {
    MongoClient.connect.restore();
  });

  describe('When there is no products in DB', () => {
    it('Should returns an array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });
    it('Should returns an empty array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.empty;
    });
  });

  describe('When there is at least one product in DB', () => {
    before( async () => {
      await productsModel.create(newProduct);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('Should returns an array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });
    it('Should returns a not empty array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects', async () => {
      [item] = await productsModel.getAll();
      expect(item).to.be.an('object');
    });

    it('Should returns an array with objects wich has mandatory attributes', async () => {
      const [item] = await productsModel.getAll();
      expect(item).to.include.all.keys('name', 'quantity');
    });
  });


});

describe('Get all sales', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore;
  });

  describe('When there is no sales in DB', () => {
    it('Should returns an array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });
    it('Should returns an empty array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.empty;
    });
  });

  describe('When there is at least one sale in DB', () => {
    before( async () => {
      await salesModel.create(newSale);
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
      MongoClient.connect.restore();
    });

    it('Should returns an array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });

    it('Should returns a not empty array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.not.be.empty;
    });

    it('Should returns an array with objects', async () => {
      [item] = await salesModel.getAll();
      expect(item).to.be.an('object');
    });

    it('Should returns an array with objects wich has mandatory attributes', async () => {
      const [item] = await salesModel.getAll();
      expect(item).to.include.all.keys('_id', 'itensSold');
    });
  });


});

describe('Update a roduct', () => {

});

describe('Update a sale', () => {

});

describe('Delete a product', () => {

describe('Delete a sale', () => {

});

});

