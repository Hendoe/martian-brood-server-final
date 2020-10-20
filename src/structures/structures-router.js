const path = require('path')
const express = require('express')
const StructuresService = require('./structures-service')

const structuresRouter = express.Router()
const jsonParser = express.json()

const serializeStructure = structure => ({
  id: structure.id,
  constructable: structure.constructable,
  structure_name: structure.structure_name,
  hp: structure.hp,
  atk: structure.atk,
  biomass_cost: structure.biomass_cost,
  synapse_produced: structure.synapse_produced,
  description: structure.description,
  special_features: structure.special_features  
})

structuresRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    StructuresService.getAllStructures(knexInstance)
      .then(structures => {
        res.json(structures.map(serializeStructure))
      })
      .catch(next)
  })

  module.exports = structuresRouter