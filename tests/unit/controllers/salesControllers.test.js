const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const response = require('./helpers');

describe('Testa o arquivo salesController', () => {
  beforeEach(sinon.restore);

  describe('Testa a função add', () => {
    it('A função deve disparar um erro caso a função validateItems do salesService dispare', () => {
      sinon.stub(salesService, 'validateItems').rejects();
      expect(salesController.add({}, {})).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função get do checkIfProductIdExists dispare', () => {
      sinon.stub(salesService, 'validateItems').resolves();
      sinon.stub(salesService, 'checkIfProductIdExists').rejects();
      expect(salesController.add({}, {})).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função add do salesService dispare', () => {
      sinon.stub(salesService, 'validateItems').resolves();
      sinon.stub(salesService, 'checkIfProductIdExists').rejects();
      sinon.stub(salesService, 'add').rejects();
      expect(salesController.add({}, {})).to.eventually.be.rejected;
    });

    it('A função deve retornar o status 201 e o json o id e a lista dos produtos vendidos', async () => {
      const res = response();

      const items = [{
        "productId": 1,
        "quantity": 1
      },
        {
          "productId": 2,
          "quantity": 5
        }];
      
      const finalresponse = {
        id: 3,
        itemsSold: [{
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }],
      };

      sinon.stub(salesService, 'validateItems').resolves(items);
      sinon.stub(salesService, 'checkIfProductIdExists').resolves(true);
      sinon.stub(salesService, 'add').resolves({ items, id: 3});
      await salesController.add(items, res);
      expect(res.status.getCall(0).args[0]).to.equal(201);
      expect(res.json.getCall(0).args[0]).to.deep.equal(finalresponse);
    });
  });

  describe('Testa a função listAll', () => {
    it('A função deve disparar um erro caso a função listAll do salesService dispare', () => {
      sinon.stub(salesService, 'listAll').rejects();
      expect(salesController.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar o status 200 e o json com a lista de produtos vendidos', async () => {
      const res = response();

      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }];

      sinon.stub(salesService, 'listAll').resolves(sales);
      await salesController.listAll({}, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(sales);
    });
  });

  describe('Testa a função getSalesById', () => {
    it('A função deve disparar um erro caso a função validId do salesService dispare', () => {
      sinon.stub(salesService, 'validateId').rejects();
      expect(salesController.getSalesById(0)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função checkIfSalesExists do salesService dispare', () => {
      sinon.stub(salesService, 'validateId').resolves();
      sinon.stub(salesService, 'checkIfSalesExists').rejects();
      expect(salesController.getSalesById(0)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função getSalesById do salesService dispare', () => {
      sinon.stub(salesService, 'validateId').resolves();
      sinon.stub(salesService, 'checkIfSalesExists').resolves(true);
      sinon.stub(salesService, 'getSalesById').rejects();
      expect(salesController.getSalesById(0)).to.eventually.be.rejected;
    });

    it('A função deve retornar o status 200 e o json com os produtos vendidos', async () => {
      const res = response();

      const sales = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }];

      sinon.stub(salesService, 'validateId').resolves({ id: 1 });
      sinon.stub(salesService, 'checkIfSalesExists').resolves(true);
      sinon.stub(salesService, 'getSalesById').resolves(sales);
      await salesController.getSalesById(1, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(sales);
    });
  });

  describe('Testa a função remove', () => {
    it('A função deve disparar um erro caso a função validateId dispare', () => {
      sinon.stub(salesService, 'validateId').rejects();
      expect(salesController.remove(0)).to.eventually.be.rejected;
    });

    it('A função deve dispara um erro caso a função checkIfSalesExists dispare', () => {
      sinon.stub(salesService, 'validateId').resolves();
      sinon.stub(salesService, 'checkIfSalesExists').rejects();
      expect(salesController.remove(0)).to.eventually.be.rejected;
    });

    it('A função deve dispara um erro caso a função salesService.remove dispare', () => {
      sinon.stub(salesService, 'validateId').resolves();
      sinon.stub(salesService, 'checkIfSalesExists').resolves();
      sinon.stub(salesService, 'remove').rejects();
      expect(salesController.remove(0)).to.eventually.be.rejected;
    });

    it('A função deve retornar o status 204', async () => {
      const res = response();

      sinon.stub(salesService, 'validateId').resolves({ id: 1 });
      sinon.stub(salesService, 'checkIfSalesExists').resolves(true);
      sinon.stub(salesService, 'remove').resolves({ id: 1 });
      await salesController.remove(1, res);
      expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });
});