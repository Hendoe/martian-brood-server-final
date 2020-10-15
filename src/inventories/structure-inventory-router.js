const path = require('path')
const express = require('express')
const xss = require('xss')
const StructureInventoryService = require('./structure-inventory-service')

const structureInventoryRouter = express.Router()
const bodyParser = express.json()

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
    StructureInventoryService.getStructureInventory(knexInstance)
      .then(structure => {
        res.json(structure.map(serializeStructureInventory))
      })
      .catch(next)
  })

structureInventoryRouter
  .route('/:structure_id')

  .all((req, res, next) => {
    const { structure_id } = req.params
    StructureInventoryService.getById(req.app.get('db'), structure_id)
      .then(structure => {
        if(!structure) {
          return res.status(404).json({
            error: { message: `Structure Inventory doesn't exist` }
          })
        }
      res.structure = structure
      next()
    })
    .catch(next)
  })

  .get((req, res) => {
    res.json(serializeStructureInventory(res.structure))
  })

  .patch(bodyParser, (req, res, next) => {
    const { structure_name, constructing_count, brood_count, constructable } = req.body
    const newStructureInventory = { structure_name, constructing_count, brood_count, constructable }

    StructureInventoryService.updateStructureInventory(
      req.app.get('db'),
      req.params.structure_id,
      newStructureInventory
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = structureInventoryRouter