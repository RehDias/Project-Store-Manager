const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.delete('/:id', salesController.remove);

salesRoute.put('/:id', salesController.edit);

salesRoute.get('/:id', salesController.getSalesById);

salesRoute.get('/', salesController.listAll);

salesRoute.post('/', salesController.add);

module.exports = salesRoute;