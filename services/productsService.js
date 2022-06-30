const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { validateSchema } = require('./helpers');

const productsService = {
  validateId: validateSchema(Joi.object({
    id: Joi.number().integer().positive().messages({
      'number.base': 'Product not found', 
    }),
  }).required()),

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