// const Joi = require('joi');
const salesModel = require('../models/salesModel');

const salesService = {
  async add(body) {
    const id = await salesModel.add(body);
    return id;
  },
};

module.exports = salesService;