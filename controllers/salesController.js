const salesService = require('../services/salesService');

const salesController = {
  async add(req, res) {
    const validated = await salesService.validateItems(req.body);
    await Promise.all(validated.map(({ productId }) => salesService.checkIfProductIdExists(productId)));
    const { items, id } = await salesService.add(validated);
    const response = {
      id,
      itemsSold: items,
    };
    res.status(201).json(response);
  },

  async listAll(_req, res) {
    const sales = await salesService.listaAll();
    res.status(200).json(sales);
  },

  async getSalesById(req, res) {
    const { id } = await salesService.validateId(req.params);
    await salesService.checkIfSalesExists(id);
    const sales = await salesService.getSalesById(id);
    res.status(200).json(sales);
  },
};

module.exports = salesController;