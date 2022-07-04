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
});