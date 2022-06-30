const salesService = require('../services/salesService');

const salesController = {
  async add(req, res) {
    const id = await salesService.add(req.body);
    res.send(id);
  },
};

module.exports = salesController;