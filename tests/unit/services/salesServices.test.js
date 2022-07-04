const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const NotFoundError = require('../../../middlewares/notFoundErrors');

describe('Testa o arquivo salesService', () => {
  beforeEach(sinon.restore);

  describe('Testa a função add', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'addIntoSales').rejects();
      expect(salesService.add({})).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função addIntoSalesProducts dispare', () => {
      sinon.stub(salesModel, 'addIntoSalesProducts').rejects();
      expect(salesService.add({})).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função getproductsSold dispare', () => {
      sinon.stub(salesModel, 'getProductsSold').rejects();
      expect(salesService.add({})).to.eventually.be.rejected;
    });

    it('A função deve retornar o id inserido e a lista caso o salesModel dê certo', () => {
      sinon.stub(salesModel, 'addIntoSales').resolves(2);
      sinon.stub(salesModel, 'getProductsSold').resolves([]);
      expect(salesService.add([], 2)).to.eventually.deep.equal([], 2);
    });
  });

  describe('Testa a função checkIfProductIdExists', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'productIdExists').rejects();
      expect(salesService.checkIfProductIdExists(1)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro NotFoundError caso o salesModel retorne false', () => {
      sinon.stub(salesModel, 'productIdExists').resolves(false);
      expect(salesService.checkIfProductIdExists(6)).to.eventually.be.rejectedWith(NotFoundError);
    });

    it('A função deve resolver caso o salesModel retorne true', () => {
      sinon.stub(salesModel, 'productIdExists').resolves(true);
      expect(salesService.checkIfProductIdExists(1)).to.eventually.be.undefined;
    });
  });
});