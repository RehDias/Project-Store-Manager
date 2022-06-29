const { Router } = require('express');

const productsRoute = Router();

productsRoute.get('/:id');

productsRoute.get('/');

module.exports = productsRoute;