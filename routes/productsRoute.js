const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/search', productsController.search);

productsRoute.delete('/:id', productsController.remove);

productsRoute.put('/:id', productsController.edit);

productsRoute.get('/:id', productsController.get);

productsRoute.post('/', productsController.add);

productsRoute.get('/', productsController.listAll);

module.exports = productsRoute;