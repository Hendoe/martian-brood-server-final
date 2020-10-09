const path = require('path')
const express = require('express')
const xss = require('xss')
const ConstructionOrderService = require('./construction-order-service')

const constructionOrderRouter = express.Router()
const jsonParser = express.json()

const serializeConstructionOrder = order => ({
  id: order.id,
  structure_name: order.structure_name,
  total_to_construct: order.total_to_construct,
  biomass_cost: order.biomass_cost,
  synapse_produced: order.synapse_produced,
  })

constructionOrderRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ConstructionOrderService.getAllOrders(knexInstance)
      .then(orders => {
        res.json(orders.map(serializeConstructionOrder))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { structure_name, total_to_construct, biomass_cost, synapse_produced } = req.body
    const newPlan = { structure_name, total_to_construct, biomass_cost, synapse_produced }

    ConstructionOrderService.insertOrder(
      req.app.get('db'),
      newPlan
    )
      .then(newOrder => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${newOrder.id}`))
          .json(serializeConstructionOrder(newOrder))
      })
      .catch(next)
  })

  module.exports = constructionOrderRouter