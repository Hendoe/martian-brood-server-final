const path = require('path')
const express = require('express')
const xss = require('xss')
const StatusService = require('./status-service')

const statusRouter = express.Router()
const jsonParser = express.json()

const serializeStatus = report => ({
  id: report.id,
  brood_name: report.brood_name,
  solar_day: report.solar_day,
  biomass: report.biomass,
  synapse_required: report.synapse_required,
  synapse_produced: report.synapse_produced
})

statusRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    StatusService.getStatus(knexInstance)
      .then(status => {
        res.json(status.map(serializeStatus))
      })
      .catch(next)
  })

  module.exports = statusRouter