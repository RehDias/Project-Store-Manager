const productsModel = require('../models/productsModel');
const { productNotFoundError } = require('../middlewares/notFoundErrors');
const Joi = require('joi');
const { runSchema } = require('./helpers');
const { listAll } = require('../models/productsModel');

const productsService = {
  validateId: runSchema(Joi.object({
    id: Joi.number().integer().positive().messages({
      'number.base': 'Product not found', 
    }),
  }).required()),

  async checkIfExists(id) {
    const exist = await productsModel.exists(id);
    if (!exist) throw new productNotFoundError('Product not found');
  },

  async listAll() {
    const products = await productsModel.listAll();
    return products;
  },

  async get(id) {
    const product = await productsModel.get(id);
    return product;
  },
};

module.exports = productsService;