const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { validateSchema } = require('./helpers');
const NotFoundError = require('../middlewares/notFoundErrors');

const salesService = {
  validateItems: validateSchema(Joi.array().items(Joi.object({
    productId: Joi.number().integer().positive().required()
      .label('productId'),
    quantity: Joi.number().min(1).integer().positive()
      .required()
      .label('quantity'),
  }))),

  async add(body) {
    const id = await salesModel.addIntoSales();
    await salesModel.addIntoSalesProducts(body, id);
    const items = await salesModel.getProductsSold(id);
    return { items, id };
  },

  async checkIfExists(body) {
    const exist = await salesModel.productIdExists(body);
    if (!exist) throw new NotFoundError('Product not found');
  },
};

module.exports = salesService;