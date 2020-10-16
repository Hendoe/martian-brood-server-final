const path = require('path')
const express = require('express')
const xss = require('xss')
const AlienInventoryService = require('./alien-inventory-service')

const alienInventoryRouter = express.Router()
const bodyParser = express.json()

const serializeAlienInventory = alien => ({
  id: alien.id,
  alien_name: alien.alien_name,
  spawning_count: alien.spawning_count,
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

alienInventoryRouter
  .route('/:alien_id')

  .all((req, res, next) => {
    const { alien_id } = req.params
    AlienInventoryService.getById(req.app.get('db'), alien_id)
      .then(alien => {
        if(!alien) {
          return res.status(404).json({
            error: { message: `Alien Inventory doesn't exist`}
          })
        }
        res.alien = alien
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(serializeAlienInventory(res.alien))
  })

  .patch(bodyParser, (req, res, next) => {
    const { alien_name, spawning_count, brood_count, spawnable } = req.body
    const newAlienInventory = { alien_name, spawning_count, brood_count, spawnable }

    AlienInventoryService.updateAlienInventory(
      req.app.get('db'),
      req.params.alien_id,
      newAlienInventory
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  
  module.exports = alienInventoryRouter