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
      return expect(salesModel.addIntoSales()).to.eventually.be.rejected;
    });

    it('A função deve retornar  o id caso sucesso ao adicionar novo produto', () => {
      sinon.stub(connect, 'query').resolves([{ insertId: 1 }]);
      return expect(salesModel.addIntoSales()).to.eventually.equal(1);
    });
  });

  describe('Testa a função addIntoSalesProducts', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.addIntoSalesProducts()).to.eventually.be.rejected;
    });
  });

  describe('Testa a função getProductsSold', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.getProductsSold()).to.eventually.be.rejected;
    }); 


    it('A função deve retornar uma lista', () => {
      sinon.stub(connect, 'query').resolves([[]]);
      return expect(salesModel.getProductsSold(1)).to.eventually.deep.equal([]);
    });
  });

  describe('Testa a função productIdExists', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.productIdExists(9)).to.eventually.be.rejected;
    });

    it('A função deve retornar false caso o banco de dados não ache o produto', () => {
      sinon.stub(connect, 'query').resolves([[]]);
      return expect(salesModel.productIdExists(0)).to.eventually.equal(false);
    });

    it('A função deve retornar true caso o banco de dados tenha sucesso', () => {
      sinon.stub(connect, 'query').resolves([[{ 1: 1 }]]);
      return expect(salesModel.productIdExists(1)).to.eventually.equal(true);
    });
  });

  describe('Testa a função listaAll', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar uma lista vazia caso tenha nada no banco de dados', () => {
      sinon.stub(connect, 'query').resolves([]);
      return expect(salesModel.listAll()).to.eventually.be.undefined;
    });

    it('A função deve retornar um objeto com todos os itens da lista', () => {
      sinon.stub(connect, 'query').resolves([[{}, {}, {}]]);
      return expect(salesModel.listAll()).to.eventually.deep.equal([{}, {}, {}]);
    });
  });

  describe('Testa a função getSalesById', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.getSalesById(6)).to.eventually.be.rejected;
    });

    it('A função deve retornar os produtos vendidos caso o passe um id válido', () => {
      sinon.stub(connect, 'query').resolves([[{}, {}]]);
      return expect(salesModel.getSalesById(1)).to.eventually.deep.equal([{}, {}]);
    });
  });

  describe('Testa a função salesExists', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.salesExists(0)).to.eventually.be.rejected;
    });

    it('A função deve retornar um booleano', () => {
      sinon.stub(connect, 'query').resolves([[{ 1: 1 }]]);
      return expect(salesModel.salesExists(1)).to.eventually.equal(true);
    });
  });

  describe('Testa a função remove', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(salesModel.remove(0)).to.eventually.be.rejected;
    });

    it('A função remove o produto do banco de dados se tudo dê certo', () => {
      sinon.stub(connect, 'query').resolves();
      return expect(salesModel.remove(1)).to.eventually.be.undefined;
    });
  });
});