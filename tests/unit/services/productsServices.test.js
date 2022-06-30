const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const NotFoundError = require('../../../middlewares/notFoundErrors');

describe('Testa o arquivo productsServices', () => {
  beforeEach(sinon.restore);

  describe('Testa a função checkIfExists', () => { 
    it('A função deve disparar um erro caso o productsModel dispare um erro', () => {
      sinon.stub(productsModel, 'exists').rejects();
      expect(productsService.checkIfExists(1)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro NotFoundError caso o productsModel retorne false', () => {
      sinon.stub(productsModel, 'exists').resolves(false);
      expect(productsService.checkIfExists(6)).to.eventually.be.rejectedWith(NotFoundError);
    });

    it('A função deve resolver caso o productsModel retorne true', () => {
      sinon.stub(productsModel, 'exists').resolves(true);
      expect(productsService.checkIfExists(1)).to.eventually.be.undefined;
    });
  });
  
  describe('Testa a função listaAll', () => {
    it('A função deve disparar um erro caso o productsModel dispare um erro', () => {
      sinon.stub(productsModel, 'listAll').rejects();
      expect(productsService.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar uma lista de produtos caso o productsModel dê certo', () => {
      sinon.stub(productsModel, 'listAll').resolves([{}, {}]);
      expect(productsService.listAll()).to.eventually.deep.equal([{}, {}]);
    });
  });

  describe('Testa a função get', () => {
    it('A função deve disparar um erro caso o productsModel dispare um erro', () => {
      sinon.stub(productsModel, 'get').rejects();
      expect(productsService.get(8)).to.eventually.be.rejected;
    });

    it('A função deve retornar um produto caso o productsModel dê certo', () => {
      sinon.stub(productsModel, 'get').resolves([{}]);
      expect(productsService.get(1)).to.eventually.deep.equal([{}]);
    });
  });

  describe('Testa a função add', () => {
    it('A função deve disparar um erro caso o productsModel dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      expect(productsService.add({})).to.eventually.be.rejected;
    });

    it('A função deve retornar o id inserido caso o productsModel dê certo', () => {
      sinon.stub(productsModel, 'add').resolves(2);
      expect(productsService.add({})).to.eventually.equal(2);
    });
  });
});