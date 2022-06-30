const productsService = require('../services/productsService');

const productsController = {
  async listAll(_req, res) {
    const products = await productsService.listAll();
    res.status(200).json(products);
  },

  async get(req, res) {
    const { id } = await productsService.validateId(req.params);
    await productsService.checkIfExists(id);
    const product = await productsService.get(id);
    res.status(200).json(product);
  },

  async add(req, res) {
    const body = await productsService.validateBody(req.body);
    const id = await productsService.add(body);
    const product = await productsService.get(id);
    res.status(201).json(product);
  }
};

module.exports = productsController;