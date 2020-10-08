const path = require('path')
const express = require('express')
const xss = require('xss')
const SpawningPlansService = require('./spawning-plans-service')

const spawningPlansRouter = express.Router()
const jsonParser = express.json()

const serializeSpawnPlan = plan => ({
  id: alien.id,
  toSpawn: plan.to_spawn,
  total_spawning: plan.total_aliens_spawning,
  biomass_cost: plan.total_biomass_cost,
  synapse_required: plan.total_synapse_required,
  })

spawningPlansRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    SpawningPlansService.getAllPlans(knexInstance)
      .then(plans => {
        res.json(plans.map(serializeSpawnPlan))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { toSpawn, total_spawning, biomass_cost, synapse_required } = req.body
    const newPlan = { toSpawn, total_spawning, biomass_cost, synapse_required }

    SpawningPlansService.insertPlan(
      req.app.get('db'),
      newPlan
    )
      .then(plan => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${plan.id}`))
          .json(serializeSpawnPlan(plan))
      })
      .catch(next)
  })

  module.exports = spawningPlansRouter