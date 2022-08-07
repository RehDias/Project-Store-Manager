const salesService = require('../services/salesService');

const salesController = {
  async add(req, res) {
    const validated = await salesService.validateItems(req.body);
    await Promise.all(validated
      .map(({ productId }) => salesService.checkIfProductIdExists(productId)));
    const { items, id } = await salesService.add(validated);
    const response = {
      id,
      itemsSold: items,
    };
    res.status(201).json(response);
  },

  async listAll(_req, res) {
    const sales = await salesService.listAll();
    res.status(200).json(sales);
  },

  async getSalesById(req, res) {
    const { id } = await salesService.validateId(req.params);
    await salesService.checkIfSalesExists(id);
    const sales = await salesService.getSalesById(id);
    res.status(200).json(sales);
  },

  async remove(req, res) {
    const { id } = await salesService.validateId(req.params);
    await salesService.checkIfSalesExists(id);
    await salesService.remove(id);
    res.sendStatus(204);
  },

  async edit(req, res) {
    const { id } = await salesService.validateId(req.params);
    await salesService.checkIfSalesExists(id);
    const validated = await salesService.validateItems(req.body);
    await salesService.checkIfSalesProductIdExists(validated);

    await Promise.all([
      validated.map((sales) => salesService.edit(id, sales)),
    ]);   
    
    const response = {
      saleId: id,
      itemsUpdated: validated,
    };
    
    res.status(200).json(response);
  },
};

module.exports = salesController;