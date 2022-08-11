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
    const data = await productsService.validateBody(req.body);
    const id = await productsService.add(data);
    const product = await productsService.get(id);
    res.status(201).json(product);
  },

  async edit(req, res) {
    const [{ id }, data] = await Promise.all([
      productsService.validateId(req.params),
      productsService.validateBody(req.body),
    ]);
    await productsService.checkIfExists(id);
    await productsService.edit(id, data);
    res.status(200).json({ id, name: data.name });
  },

  async remove(req, res) {
    const { id } = await productsService.validateId(req.params);
    await productsService.checkIfExists(id);
    await productsService.remove(id);
    res.sendStatus(204);
  },

  async search(req, res) {
    if (req.query === undefined) {
      const list = await productsService.listAll();
      return res.json(list);
    }
    
    const search = await productsService.search(req.query);
    res.json(search);
  },
};

module.exports = productsController;