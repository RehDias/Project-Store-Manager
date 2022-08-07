const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { validateSchema } = require('./helpers');
const NotFoundError = require('../middlewares/NotFoundError');

const salesService = {
  validateItems: validateSchema(Joi.array().items(Joi.object({
    productId: Joi.number().integer().positive().required()
      .label('productId'),
    quantity: Joi.number().min(1).integer().positive()
      .required()
      .label('quantity'),
  })).required()),

  validateId: validateSchema(Joi.object({
    id: Joi.number().integer().positive(),
  }).required()),

  async add(body) {
    const id = await salesModel.addIntoSales();
    await salesModel.addIntoSalesProducts(body, id);
    const items = await salesModel.getProductsSold(id);
    return { items, id };
  },

  async checkIfProductIdExists(body) {
    const exist = await salesModel.productIdExists(body);
    if (!exist) throw new NotFoundError('Product not found');
  },

  async checkIfSalesProductIdExists(sales) {
    const exist = await Promise.all(
      sales.map(({ productId }) => salesModel.salesProductIdExists(productId)),
    );
    if (exist.includes(false)) throw new NotFoundError('Product not found');
  },

  async listAll() {
    const sales = await salesModel.listAll();
    return sales;
  },

  async getSalesById(id) {
    const sales = await salesModel.getSalesById(id);
    return sales;
  },

  async checkIfSalesExists(id) {
    const exists = await salesModel.salesExists(id);
    if (!exists) throw new NotFoundError('Sale not found');
  },

  async remove(id) {
    await salesModel.remove(id);
  },

  async edit(id, sales) {
    await salesModel.edit(id, sales);
  },
};

module.exports = salesService;