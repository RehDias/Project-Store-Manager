const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/:id', salesController.getSalesById);
salesRoute.get('/', salesController.listAll);
salesRoute.post('/', salesController.add);

module.exports = salesRoute;