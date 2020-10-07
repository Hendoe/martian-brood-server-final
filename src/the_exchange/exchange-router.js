const express = require('express')
const ExchangeService = require('./exchange-service')

const aliensRouter = require('../aliens/aliens-router');
const structuresRouter = require('../structures/structures-router');
const alienInventoryRouter = require('../alien-inventory/alien-inventory-router');
const structureInventoryRouter = require('../structure-inventory/structure-inventory-router');

const theExchange = express.Router()

theExchange.get('/', (req, res) => {
  res.send('THE EXCHANGE')
});


theExchange.get('/api/aliens', aliensRouter);
theExchange.get('/api/structures', structuresRouter);
theExchange.get('/api/alienInventory', alienInventoryRouter);
theExchange.get('/api/structureInventory', structureInventoryRouter);


module.exports = theExchange