const path = require('path')
const express = require('express')
const xss = require('xss')
const CommitService = require('./commit-service')

const commitRouter = express.Router()
const bodyParser = express.json()

commitRouter
  .route('/status')
  .patch(bodyParser, (req, res, next) => {
    const { brood_name, solar_day, biomass, synapse_required, synapse_produced } = req.body
    const newStatus = { brood_name, solar_day, biomass, synapse_required, synapse_produced }

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
  .route('/alienInventory')
  .patch(bodyParser, (req, res, next) => {
    const { id, alien_name, spawning_count, brood_count } = req.body
    const newAlienInventory = { id, alien_name, spawning_count, brood_count }

    CommitService.updateAlienInventory(
      req.app.get('db'),
      newAlienInventory
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = commitRouter