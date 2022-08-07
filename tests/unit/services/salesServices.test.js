const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const NotFoundError = require('../../../middlewares/NotFoundError');

describe('Testa o arquivo salesService', () => {
  beforeEach(sinon.restore);

  describe('Testa a função add', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'addIntoSales').rejects();
      return expect(salesService.add({})).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função addIntoSalesProducts dispare', () => {
      sinon.stub(salesModel, 'addIntoSalesProducts').rejects();
      return expect(salesService.add({})).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função getproductsSold dispare', () => {
      sinon.stub(salesModel, 'getProductsSold').rejects();
      return expect(salesService.add({})).to.eventually.be.rejected;
    });

    it('A função deve retornar o id inserido e a lista caso o salesModel dê certo', () => {
      const result = [{ productId: 1, quantity: 1 }];
      const obj = { items: undefined, id: 1 };
      sinon.stub(salesModel, 'addIntoSales').resolves(1);
      sinon.stub(salesModel, 'getProductsSold').resolves();
      return expect(salesService.add(result)).to.eventually.deep.equal(obj);
    });
  });

  describe('Testa a função checkIfProductIdExists', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'productIdExists').rejects();
      return expect(salesService.checkIfProductIdExists(1)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro NotFoundError caso o salesModel retorne false', () => {
      sinon.stub(salesModel, 'productIdExists').resolves(false);
      return expect(salesService.checkIfProductIdExists(6)).to.eventually.be.rejectedWith(NotFoundError);
    });

    it('A função deve resolver caso o salesModel retorne true', () => {
      sinon.stub(salesModel, 'productIdExists').resolves(true);
      return expect(salesService.checkIfProductIdExists(1)).to.eventually.be.undefined;
    });
  });

  describe('Testa a função listAll', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'listAll').rejects();
      return expect(salesService.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar uma lista de produtos vendidos caso o salesModel dê certo', () => {
      sinon.stub(salesModel, 'listAll').resolves([{}, {}]);
      return expect(salesService.listAll()).to.eventually.deep.equal([{}, {}]);
    });
  });

  describe('Testa a função getSalesById', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'getSalesById').rejects();
      return expect(salesService.getSalesById(0)).to.eventually.be.rejected;
    });

    it('A função deve retornar os produtos vendidos caso o salesModel dê certo', () => {
      sinon.stub(salesModel, 'getSalesById').resolves([{}]);
      return expect(salesService.getSalesById(1)).to.eventually.deep.equal([{}]);
    });
  });

  describe('Testa a função checkIfSalesExists', () => {
    it('A função deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'salesExists').rejects();
      return expect(salesService.checkIfSalesExists(1)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro NotFoundError caso o salesModel retorne false', () => {
      sinon.stub(salesModel, 'salesExists').resolves(false);
      return expect(salesService.checkIfSalesExists(0)).to.eventually.be.rejectedWith(NotFoundError);
    });

    it('A função deve resolver caso o salesModel retorne true', () => {
      sinon.stub(salesModel, 'salesExists').resolves(true);
      return expect(salesService.checkIfSalesExists(1)).to.eventually.be.undefined;
    });
  });

  describe('Testa a função remove', () => {
    it('A função deve disparar um erro caso a função salesModel.remove dispare', () => {
      sinon.stub(salesModel, 'remove').rejects();
      return expect(salesService.remove(0)).to.eventually.be.rejected;
    });

    it('A função remove o produto do banco de dados se tudo dê certo', () => {
      sinon.stub(salesModel, 'remove').resolves();
      return expect(salesService.remove(1)).to.eventually.be.undefined;
    });
  });
});