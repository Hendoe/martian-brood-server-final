const path = require('path')
const express = require('express')
const xss = require('xss')
const StructureInventoryService = require('./structure-inventory-service')

const structureInventoryRouter = express.Router()
const jsonParser = express.json()

const serializeStructureInventory = structure => ({
  id: structure.id,
  structure_name: structure.structure_name,
  constructing_count: structure.constructing_count,
  brood_count: structure.brood_count,
  constructable: structure.constructable
})

structureInventoryRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    StructureInventoryService.getStatus(knexInstance)
      .then(structure => {
        res.json(structure.map(serializeStructureInventory))
      })
      .catch(next)
  })

  module.exports = structureInventoryRouter