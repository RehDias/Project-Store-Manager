const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const Joi = require('joi');
const { validateSchema, errorCode } = require('../../../services/helpers');

const schema = Joi.object();

describe('Testa o arquivo helpers', () => {
  beforeEach(sinon.restore);
  
  describe('Testa a função validateSchema', () => {
    it('A função deve disparar um erro caso o joi dispare um erro', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      expect(validateSchema(schema)()).to.eventually.be.rejected;
    });

    it('A função deve retorna um resultado em caso de sucesso', () => {
      sinon.stub(schema, 'validateAsync').resolves({ id: 1 });
      expect(validateSchema(schema)()).to.eventually.deep.equal({ id: 1 });
    });
  });

  describe('Testa a função errorCode', () => {
    it('A função deve retornar o código 422 caso a menssagem de erro possua "must be"', () => {
      expect(errorCode('"quantity" must be greater than or equal to 1')).to.equal(422);
    });

    it('A função deve retornar o código 404 caso a menssagem de erro seja "Product not found"', () => {
      expect(errorCode('Product not found')).to.equal(404);
    });

    it('A função deve retornar o código 400 como padrão', () => {
      expect(errorCode('"quantity" is required')).to.equal(400);
    });
  });
});