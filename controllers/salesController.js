const salesService = require('../services/salesService');

const salesController = {
  async add(req, res) {
    const validated = await salesService.validateItems(req.body);
    await Promise.all(req.body.map(({ productId }) => salesService.checkIfExists(productId)));
    const { items, id } = await salesService.add(validated);
    const response = {
      id,
      itemsSold: items,
    };
    res.status(201).json(response);
  },
};

module.exports = salesController;