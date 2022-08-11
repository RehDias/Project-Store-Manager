const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const productsModel = require('../../../models/productsModel');
const connect = require('../../../models/connection');

describe('Testa o arquivo productsModel', () => {
  beforeEach(sinon.restore);

  describe('Testa a função listAll', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.listAll()).to.eventually.be.rejected;
    });

    it('A função deve retornar uma lista vazia caso tenha nada no banco de dados', () => {
      sinon.stub(connect, 'query').resolves([]);
      return expect(productsModel.listAll()).to.eventually.be.undefined;
    });

    it('A função deve retornar um objeto com todos os itens da lista', () => {
      const result = [{ id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' }];
      sinon.stub(connect, 'query').resolves([result]);
      return expect(productsModel.listAll()).to.eventually.deep.equal(result);
    });
  });

  describe('Testa a função get', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.get(6)).to.eventually.be.rejected;
    });

    it('A função deve retornar um item caso o passe um id válido', () => {
      const result = [{ id: 1, name: 'Martelo de Thor' }];
      sinon.stub(connect, 'query').resolves([[result]]);
      return expect(productsModel.get(1)).to.eventually.deep.equal(result);
    });
  });

  describe('Testa a função exists', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.exists(6)).to.eventually.be.rejected;
    });

    it('A função deve retornar um booleano', () => {
      sinon.stub(connect, 'query').resolves([[{ 1: 1 }]]);
      return expect(productsModel.exists(1)).to.eventually.equal(true);
    });
  });

  describe('Testa a função add', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.add({})).to.eventually.be.rejected;
    });

    it('A função deve retornar o id caso sucesso ao adicionar novo produto', () => {
      sinon.stub(connect, 'query').resolves([{ insertId: 5 }]);
      return expect(productsModel.add({})).to.eventually.equal(5);
    });
  });

  describe('Testa a função edit', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.edit({})).to.eventually.be.rejected;
    });

    it('A função altera no banco de dados se tudo dê certo', () => {
      sinon.stub(connect, 'query').resolves();
      return expect(productsModel.edit({})).to.eventually.be.undefined;
    });
  });

  describe('Testa a função remove', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.remove(0)).to.eventually.be.rejected;
    });

    it('A função remove o produto do banco de dados se tudo dê certo', () => {
      sinon.stub(connect, 'query').resolves();
      return expect(productsModel.remove(1)).to.eventually.be.undefined;
    });
  });

  describe('Testa a função search', () => {
    it('A função deve disparar um erro caso o banco de dados dispare um erro', () => {
      sinon.stub(connect, 'query').rejects();
      return expect(productsModel.search(0)).to.eventually.be.rejected;
    });

    it('A função retorna o resultado da busca efetuada pelo req.query', () => {
      sinon.stub(connect, 'query').resolves([[{}]]);
      return expect(productsModel.search([{}])).to.eventually.be.deep.equal([{}]);
    });
  });
});