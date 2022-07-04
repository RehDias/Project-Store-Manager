const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/:id', productsController.get);

productsRoute.put('/:id', productsController.edit);

productsRoute.post('/', productsController.add);

productsRoute.get('/', productsController.listAll);

module.exports = productsRoute;