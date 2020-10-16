const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeStatusArray } = require('./status.fixtures')

describe('Status Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE status_report RESTART IDENTITY'))

  afterEach('cleanup', () => db.raw('TRUNCATE status_report RESTART IDENTITY'))

  describe('GET /api/status', () => {
    context('Given no status', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/status')
          .expect(200, [])
      })
    })

    context('Given there is a status in the database', () => {
      const testStatus = makeStatusArray();

      beforeEach('insert status', () => {
        return db
          .into('status_report')
          .insert(testStatus)
      })

      it('responds with 200 and all of the status', () => {
        return supertest(app)
          .get('/api/status')
          .expect(200, testStatus)
      })

    })
  })
})