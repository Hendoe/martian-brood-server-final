const path = require('path')
const express = require('express')
const xss = require('xss')
const AliensService = require('./aliens-service')

const aliensRouter = express.Router()
const jsonParser = express.json()

const serializeAlien = alien => ({
  id: alien.id,
  alien_name: alien.alien_name,
  spawnable: alien.spawnable,
  spawning: alien.spawning,
  active: alien.active,
  to_spawn: alien.to_spawn,
  spawning_count: alien.spawning_count,
  brood_count: alien.brood_count,
  hp: alien.hp,
  atk: alien.atk,
  biomass_cost: alien.biomass_cost,
  synapse_required: alien.synapse_required,
  description: alien.description,
  special_features: alien.special_features  
})

aliensRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AliensService.getAllAliens(knexInstance)
      .then(aliens => {
        res.json(aliens.map(serializeAlien))
      })
      .catch(next)
  })

  module.exports = aliensRouter