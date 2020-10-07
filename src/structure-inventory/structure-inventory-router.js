const express = require('express')
const StructureInventoryService = require('./structure-inventory-service')

const structureInventoryRouter = express.Router()

const serializeStructureInventory = structure_inventory => ({
  id: structure_inventory.id,
  alive: structure_inventory.alive,
  structure_name: structure_inventory.structure_name,
  amount: structure_inventory.amount
})

structureInventoryRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    StructureInventoryService.getStructureInventory(knexInstance)
      .then(structureInventory => {
        res.json(structureInventory.map(serializeStructureInventory))
  })
  .catch(next)
})

module.exports = structureInventoryRouter