const path = require('path')
const express = require('express')
const xss = require('xss')
const AlienInventoryService = require('./alien-inventory-service')

const alienInventoryRouter = express.Router()
const jsonParser = express.json()

const serializeAlienInventory = alien => ({
  id: alien.id,
  alien_name: alien.alien_name,
  constructing_count: alien.constructing_count,
  brood_count: alien.brood_count,
  spawnable: alien.spawnable
})

alienInventoryRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AlienInventoryService.getAlienInventory(knexInstance)
      .then(alien => {
        res.json(alien.map(serializeAlienInventory))
      })
      .catch(next)
  })

  module.exports = alienInventoryRouter