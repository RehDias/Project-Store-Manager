const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const response = require('./helpers');

describe('Testa o arquivo productsControllers', () => { 
  beforeEach(sinon.restore);

  describe('Testa a função listaAll', () => { 
    it('A função deve disparar um erro caso a função listAll do productsService dispare', () => {
      sinon.stub(productsService, 'listAll').rejects();
      expect(productsController.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar o status 200 e o json com a lista de produtos', async () => {
      const res = response();
      const products = [{ "id": 1, "name": "Martelo de Thor" },
        { "id": 2, "name": "Traje de encolhimento" }, { "id": 3, "name": "Escudo do Capitão América" }];

      sinon.stub(productsService, 'listAll').resolves(products);
      await productsController.listAll({}, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(products);
    });
  });
  
  describe('Testa a função get', () => {
    it('A função deve disparar um erro caso a função validId do productsService dispare', () => {
      sinon.stub(productsService, 'validateId').rejects();
      expect(productsController.get(2)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função checkIfExists do productsService dispare', () => {
      sinon.stub(productsService, 'validateId').resolves();
      sinon.stub(productsService, 'checkIfExists').rejects();
      expect(productsController.get(2)).to.eventually.be.rejected;
    });

    it('A função deve disparar um erro caso a função get do productsService dispare', () => {
      sinon.stub(productsService, 'validateId').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves(true);
      sinon.stub(productsService, 'get').rejects();
      expect(productsController.get(2)).to.eventually.be.rejected;
    });

    it('A função deve retornar o status 200 e o json com um produto', async () => {
      const res = response();

      sinon.stub(productsService, 'validateId').resolves({ id: 1 });
      sinon.stub(productsService, 'checkIfExists').resolves(true);
      sinon.stub(productsService, 'get').resolves({ "id": 1, "name": "Martelo de Thor" });
      await productsController.get(1, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({ "id": 1, "name": "Martelo de Thor" });
    });
  });
 });