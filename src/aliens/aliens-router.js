const path = require('path')
const express = require('express')
const xss = require('xss')
const AliensService = require('./aliens-service')

const aliensRouter = express.Router()
const jsonParser = express.json()

const serializeAlien = alien => ({
  id: alien.id,
  spawnable: alien.spawnable,
  alien_name: alien.alien_name,
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
        console.log('ALIENS ROUTER', aliens)
        if (aliens.length === 0) {
          res.json([])
        } else {
          res.json(aliens.map(serializeAlien))
        }
      })
      .catch(next)
  })

  module.exports = aliensRouter