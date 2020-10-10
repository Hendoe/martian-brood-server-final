const path = require('path')
const express = require('express')
const xss = require('xss')
const CommitService = require('./commit-service')

const commitRouter = express.Router()
const bodyParser = express.json()

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
  .route('/:structure_id')
  .patch(bodyParser, (req, res, next) => {
    const { brood_count } = req.body
    const newStructureBroodCounts = { brood_count }

    const numberOfValues = Object.values(newStructureBroodCounts).filter(Boolean).length
    console.log(req.body)
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain 'brood_count'!`
        }
      })
    }

    CommitService.updateStructures(
      req.app.get('db'),
      newStructureBroodCounts
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = commitRouter