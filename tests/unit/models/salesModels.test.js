const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const salesModel = require('../../../models/salesModel');
const connect = require('../../../models/connection');

describe('Testa o arquivo salesModel', () => {
  beforeEach(sinon.restore);

  describe('Testa a função addIntoSales', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      expect(salesModel.addIntoSales()).to.eventually.be.rejected;
    });

    it('A função deve retornar  o id caso sucesso ao adicionar novo produto', () => {
      sinon.stub(connect, 'query').resolves([{ insertId: 1 }]);
      expect(salesModel.addIntoSales()).to.eventually.equal(1);
    });
  });

  describe('Testa a função addIntoSalesProducts', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      expect(salesModel.addIntoSalesProducts()).to.eventually.be.rejected;
    });
  });

  describe('Testa a função getProductsSold', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      expect(salesModel.getProductsSold()).to.eventually.be.rejected;
    }); 


    it('A função deve retornar uma lista', () => {
      sinon.stub(connect, 'query').resolves([]);
      expect(salesModel.getProductsSold(1)).to.eventually.deep.equal([]);
    });
  });

  describe('Testa a função productIdExists', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      expect(salesModel.productIdExists(9)).to.eventually.be.rejected;
    });

    it('A função deve retornar false caso o banco de dados não ache o produto', () => {
      sinon.stub(connect, 'query').resolves(false);
      expect(salesModel.productIdExists(9)).to.eventually.be.false;
    });

    it('A função deve retornar true caso o banco de dados tenha sucesso', () => {
      sinon.stub(connect, 'query').resolves(true);
      expect(salesModel.productIdExists(1)).to.eventually.be.true;
    });
  });
});