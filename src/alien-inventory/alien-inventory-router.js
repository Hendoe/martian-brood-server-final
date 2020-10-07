const express = require('express')
const AlienInventoryService = require('./alien-inventory-service')

const alienInventoryRouter = express.Router()

const serializeAlienInventory = alien_inventory => ({
  id: alien_inventory.id,
  alive: alien_inventory.alive,
  alien_name: alien_inventory.alien_name,
  amount: alien_inventory.amount
})

alienInventoryRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AlienInventoryService.getAlienInventory(knexInstance)
      .then(alienInventory => {
        res.json(alienInventory.map(serializeAlienInventory))
  })
  .catch(next)
})

module.exports = alienInventoryRouter