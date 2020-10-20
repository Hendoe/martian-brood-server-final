const path = require('path')
const express = require('express')
const UserService = require('./user-service')

const userRouter = express.Router()
const bodyParser = express.json()

const serializeUser = user => ({
  id: user.id,
  brood_name: user.brood_name,
})

userRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    UserService.getUser(knexInstance)
      .then(user => {
        res.json(user.map(serializeUser))
      })
      .catch(next)
  })

userRouter
  .post('/', bodyParser, (req, res, next) => {
    const { id, brood_name } = req.body
    const broodUser = { id, brood_name }

    for (const [key, value] of Object.entries(broodUser))
      if (value === null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

        UserService.getUserWithBroodName(
          req.app.get('db'),
          broodUser.brood_name
        )
          .then(dbUser => {
            if (!dbUser)
              return res.status(400).json({
                error: 'Incorrect brood_name',
              })
          })

          .then(user => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(serializeUser(user))
          })
          .catch(next)
  })

  module.exports = userRouter