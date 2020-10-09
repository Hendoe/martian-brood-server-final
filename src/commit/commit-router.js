const path = require('path')
const express = require('express')
const xss = require('xss')
const CommitService = require('./commit-service')

const commitRouter = express.Router()
const bodyParser = express.json()


    //UPDATE ALIENS 
      //total_to_spawn + brood_count
    
    //UPDATE STATUS 
      //total_to_spawn + brood_count
      //multi ALIENS biomass_cost by total_to_spawn (=x)
      //subtract (=x) biomass from STATUS biomass
      //multi ALIENS synapse by total_to_spawn (=x)
      //subtract (=x) synapse from STATUS synapse



commitRouter
  .route('/status')
  .patch(bodyParser, (req, res, next) => {
    const { brood_name, solar_day, aliens, spawning_cost, structures, biomass, synapse_required, synapse_produced } = req.body
    const newStatus = { brood_name, solar_day, aliens, spawning_cost, structures, biomass, synapse_required, synapse_produced }

    CommitService.updateStatus(
      req.app.get('db'),
      newStatus
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

commitRouter
  .route('/aliens')
  .patch(bodyParser, (req, res, next) => {
    const { id, alien_name, spawnable, to_spawn, spawning_count, brood_count, hp, atk, biomass_cost, synapse_required, description, special_features } = req.body
    const newAliens = { id, alien_name, spawnable, to_spawn, spawning_count, brood_count, hp, atk, biomass_cost, synapse_required, description, special_features }

    CommitService.updateAliens(
      req.app.get('db'),
      newAliens
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

commitRouter
  .route('/structures')
  .patch(bodyParser, (req, res, next) => {
    const { id, structure_name, constructable, to_construct, constructing_count, brood_count, hp, atk, biomass_cost, synapse_required, description, special_features } = req.body
    const newAliens = { id, structure_name, constructable, to_construct, constructing_count, brood_count, hp, atk, biomass_cost, synapse_required, description, special_features }

    CommitService.updateStructures(
      req.app.get('db'),
      newStructures
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = commitRouter