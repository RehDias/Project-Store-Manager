const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const productsModel = require('../../../models/productsModel');
const connect = require('../../../models/connection');

describe('Testa o productsModel', () => {
  beforeEach(sinon.restore);

  describe('Testa a função listAll', () => {
    it('A função deve disparar um erro caso o banco de dados dispara um erro', () => {
      sinon.stub(connect, 'query').rejects();
      expect(productsModel.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar uma lista vazia caso tenha nada no banco de dados', () => {
      sinon.stub(connect, 'query').resolves([]);
      expect(productsModel.listAll()).to.eventually.be.undefined;
    });

    it('A função deve retornar um objeto com todos os itens da lista', () => {
      sinon.stub(connect, 'query').resolves([{}, {}, {}]);
      expect(productsModel.listAll()).to.eventually.deep.equal([{}, {}, {}]);
    });
  });

  describe('Testa a função get', () => {
    it('A função deve disparar um erro caso o banco de dados dispara um erro', () => {
      sinon.stub(connect, 'query').rejects();
      expect(productsModel.get(6)).to.eventually.be.rejected;
    });

    it('A função deve retornar um item caso o passe um id válido', () => {
      sinon.stub(connect, 'query').resolves([{ "id": 1, "name": "Martelo de Thor" }]);
      expect(productsModel.get(1)).to.eventually.deep.equal([{ "id": 1, "name": "Martelo de Thor" }]);
    });
  });
});