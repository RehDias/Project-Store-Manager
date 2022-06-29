const productsModel = require('../models/productsModel');
const { productNotFoundError } = require('../middlewares/notFoundErrors');
const Joi = require('joi');
const { runSchema } = require('./helpers');

const productsService = {
  async checkIfExists(id) {
    const exist = await productsModel.exists(id);
    if (!exist) throw new productNotFoundError('Product not found');
  },
};

module.exports = productsService;