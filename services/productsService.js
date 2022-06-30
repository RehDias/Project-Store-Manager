const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../middlewares/notFoundErrors');
const { validateSchema } = require('./helpers');

const productsService = {
  validateId: validateSchema(Joi.object({
    id: Joi.number().integer().positive(),
  }).required()),
  
  validateBody: validateSchema(Joi.object({
    name: Joi.string().max(30).min(5).required(),
  }).messages({
    "string.empty": '"name" is required',
  })),

  async checkIfExists(id) {
    const exist = await productsModel.exists(id);
    if (!exist) throw new NotFoundError('Product not found');
  },

  async listAll() {
    const products = await productsModel.listAll();
    return products;
  },

  async get(id) {
    const product = await productsModel.get(id);
    return product;
  },

  async add(body) {
    const id = await productsModel.add(body);
    return id;
  },
};

module.exports = productsService;