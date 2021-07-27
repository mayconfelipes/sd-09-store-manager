const sinon = require('sinon');
const { expect } = require('chai');

const productModels = require('../../models/Products');
const saleModels = require('../../models/Sales');
const productServices = require('../../services/Products');
const saleServices = require('../../services/Sales');

describe('Service do produto', () => {
    const productMock = {
      _id: '60d64bfe495c98876b73d909',
      name: 'cubomagicos',
      quantity: 50
    };
    const productMock2 = {
      _id: '60d8956c668e7230515e77b8',
      name: 'pizzas',
      quantity: 350
    };
    describe('criar produto', async () => {
      before(() => {
        sinon.stub(productModels, 'createNewProduct')
          .resolves(productMock2);
      });

      after(() => {
        productModels.createNewProduct.restore();
        sinon.restore();
      });

      it('retorna um objeto com id', async () => {
        const { name, quantity } = productMock2;
        const result = await productServices.createNewProduct(name, quantity);
        expect(result).to.be.an('object');
        expect(result).to.have.a.property('_id');
      });
      it('retorna um objeto com name', async () => {
        const { name, quantity } = productMock2;
        const result = await productServices.createNewProduct(name, quantity);
        expect(result).to.be.an('object');
        expect(result).to.have.a.property('name');
      });
      it('retorna um objeto com quantity', async () => {
        const { name, quantity } = productMock2;
        const result = await productServices.createNewProduct(name, quantity);
        expect(result).to.be.an('object');
        expect(result).to.have.a.property('quantity');
      });
    });

    describe('criar objeto ja existente', async () => {
        before(() => {
          sinon.stub(productModels, 'createNewProduct')
            .resolves(productMock);
        });
  
        after(() => {
          productModels.createNewProduct.restore();
          sinon.restore();
        });
  
        it('retorna um erro', async () => {
          const payloadProduct = { name: 'cubomagicos', quantity: 50 };
          const result = await productServices.createNewProduct(payloadProduct);
          expect(result).to.be.an('object');
        });
      });

    describe('criar produto com propriedades inválidas', async () => {
      const productInvalid = {
        _id: '60d8956c668e7230515e77b8',
        name: '',
        quantity: -1
     }; 
      before(() => {
        sinon.stub(productModels, 'createNewProduct')
          .resolves(productInvalid);
      });

      after(() => {
        productModels.createNewProduct.restore();
        sinon.restore();
      });

      it('retorna um erro', async () => {
        const result = await productServices.createNewProduct(productInvalid);
        expect(result).to.be.null;
      });
    });

    describe('solicitar todos os produtos', async () => {
      before(() => {
        sinon.stub(productModels, 'getAll')
          .resolves([productMock]);
      });

      after(() => {
        productModels.getAll.restore();
      });

      it('retorna um array com todos objetos', async() => {
        const response = await productServices.getAll();

        expect(response).to.be.an('array')
        expect(response[0]).to.be.an('object');
      });
    });

    describe('procurar produto por id', async () => {
      before(() => {
        sinon.stub(productModels, 'findById')
          .resolves(productMock);
      });

      after(() => {
        productModels.findById.restore();
      });

      it('retorna apenas 1 resultado', async() => {
        const { _id } = productMock;
        const response = await productServices.findById(_id )

        expect(response).to.be.not.empty;
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('_id');
      });
      it('deve incluir as chaves `name` e `quantity`', async() => {
        const { _id } = productMock;
        const response = await productServices.findById(_id )

        expect(response).to.be.an('object');
        expect(response).to.include.all.keys('name', 'quantity');
      });
    });
    describe('deletar produto', async() => {
      before(() => {
        sinon.stub(productModels, 'findById')
          .resolves(productMock);
      });

      after(() => {
        productModels.findById.restore();
      });

      it('retira produto do banco', async () => {
        const { _id } = productMock
        const response = await productServices.deleteProduct(_id);

        expect(response).to.be.an('object');
      });
    });

    describe('atualizar produto', async () => {
      const updatedProduct = {
        _id: '60d64bfe495c98876b73d909',
        name: 'cubomagicos',
        quantity: 100
      };

      before(() => {
        sinon.stub(productModels, 'updateProduct')
          .resolves(updatedProduct);
      });

      after(() => {
        productModels.updateProduct.restore();
        sinon.restore();
      });

      it('retorna o produto atualizado', async() => {
        const { name, quantity } = productMock;
        const product = await productServices.createNewProduct(name, quantity);
        const response = await productServices.updateProduct(product._id, 'cubomagicos', 100);

        expect(response).to.have.a.property('name', 'cubomagicos');
      });
    });
});

describe('Service das sales', () => {
  const saleMock = [
    { productId: '1', quantity: 100 },
    { productId: '2', quantity: 250 }
  ];

  const productMock = {
    _id: '1',
    name: 'headset',
    quantity: 500
  };
  describe('criar uma venda', async () => {
    before(() => {
      sinon.stub(saleModels, 'createNewSale')
        .resolves({ _id: '1',itensSold: saleMock });
      sinon.stub(productModels, 'findById')
        .resolves(productMock);
    });

    after(() => {
      saleModels.createNewSale.restore();
      productModels.findById.restore();
      sinon.restore();
    });

    it('retorna um objeto com id', async () => {
      const response = await saleServices.createNewSale(saleMock);

      expect(response).to.be.not.empty;
      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
    it('retorna um objeto com itensSold', async () => {
        const response = await saleServices.createNewSale(saleMock);
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('itensSold');
      });
  });

  describe('listar todas as vendas', async () => {
    before(() => {
      sinon.stub(saleModels, 'getAll')
        .resolves([{ _id: '1',itensSold: saleMock }]);
    });

    after(() => {
      saleModels.getAll.restore();
    });

    it('retorna uma lista de vendas', async() => {
      const response = await saleServices.getAll();

      expect(response).to.be.not.empty;
      expect(response).to.be.an('array')
      expect(response[0]).to.be.an('object');
    });
  });

  describe('ao atualizar uma venda', async () => {
    const vendaAtualizada = [
      { productId: '1', quantity: 99 },
    ]

    before(() => {
      sinon.stub(saleModels, 'updateSale')
        .resolves({ _id: '1', itensSold: vendaAtualizada });
      sinon.stub(productModels, 'findById')
        .resolves(productMock);
    });

    after(() => {
      saleModels.updateSale.restore();
      productModels.findById();
      sinon.restore();
    });

    it('retorna obejto atualizado', async() => {
      const sale = await saleServices.createNewSale(saleMock);
      const response = await saleServices.updateSale(sale._id, vendaAtualizada);

      expect(response.itensSold[0]).to.have.a.property('quantity', 99);
    });
  });

  describe('ao atualizar uma venda com quantidade invalida', async () => {
    const vendaAtualizada = [
      { productId: '1', quantity: 0 },
    ]

    before(() => {
      sinon.stub(saleModels, 'updateSale')
        .resolves({ _id: '1', itensSold: vendaAtualizada });
      sinon.stub(productModels, 'findById')
        .resolves(productMock);
    });

    after(() => {
      saleModels.updateSale.restore();
      productModels.findById();
      sinon.restore();
    });

    it('retorna obejto de erro', async() => {
      const sale = await saleServices.createNewSale(saleMock);
      const response = await saleServices.updateSale(sale._id, vendaAtualizada);
      expect(response).to.be.a('object');
    });
  });

  describe('procurar venda por id', async () => {
    before(() => {
      sinon.stub(saleModels, 'findById')
        .resolves({ _id: '1',itensSold: saleMock });
    });

    after(() => {
      saleModels.findById.restore();
    });

    it('retorna apenas uma venda com id', async() => {
      const response = await saleServices.findById('1');

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
  });
  describe('deletar uma venda', async() => {
    const vendaDeletada = [
        { productId: '1', quantity: 99 },
      ]

    before(() => {
        sinon.stub(saleModels, 'deleteSale')
        .resolves({ _id: '1', itensSold: vendaDeletada });
        sinon.stub(saleModels, 'findById')
        .resolves(saleMock);
    });

    after(() => {
        saleModels.findById.restore();
    });

    it('retira venda do banco', async () => {
      const sale = await saleServices.createNewSale(saleMock);
      const response = await productServices.deleteSale(sale._id);

      expect(response).to.be.an('object');
    });
  });
});