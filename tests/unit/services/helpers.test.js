const sinon = require('sinon');
const chai = require('chai');
const chaiPromise = require('chai-as-promised');

chai.use(chaiPromise);
const { expect } = chai;

const Joi = require('joi');
const { validateSchema } = require('../../../services/helpers');

const schema = Joi.object();

describe('Testa o arquivo helpers', () => {
  beforeEach(sinon.restore);
  
  describe('Testa a função validateSchema', () => {
    it('A função deve disparar um erro caso o joi dispare um erro', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      return expect(validateSchema(schema)()).to.eventually.be.rejected;
    });

    it('A função deve retorna um resultado em caso de sucesso', () => {
      sinon.stub(schema, 'validateAsync').resolves({ id: 1 });
      return expect(validateSchema(schema)()).to.eventually.deep.equal({ id: 1 });
    });
  });
});