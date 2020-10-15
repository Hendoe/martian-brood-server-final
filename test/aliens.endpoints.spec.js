const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeAliensArray } = require('./aliens.fixtures')

describe('Aliens Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE aliens RESTART IDENTITY'))

  afterEach('cleanup', () => db.raw('TRUNCATE aliens RESTART IDENTITY'))

  describe('GET /api/aliens', () => {
    context('Given no aliens', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/aliens')
          .expect(200, [])
      })
    })

    context('Given there are aliens in the database', () => {
      const testAliens = makeAliensArray();

      beforeEach('insert aliens', () => {
        return db
          .into('aliens')
          .insert(testAliens)
      })

      it('responds with 200 and all of the aliens', () => {
        return supertest(app)
          .get('/api/aliens')
          .expect(200, testAliens)
      })

    })
  })
})