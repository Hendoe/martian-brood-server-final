const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeStructuresArray } = require('./structures.fixtures')

describe('Structures Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE structures RESTART IDENTITY'))

  afterEach('cleanup', () => db.raw('TRUNCATE structures RESTART IDENTITY'))

  describe('GET /api/structures', () => {
    context('Given no structures', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/structures')
          .expect(200, [])
      })
    })

    context('Given there are structures in the database', () => {
      const testStructures = makeStructuresArray();

      beforeEach('insert structures', () => {
        return db
          .into('structures')
          .insert(testStructures)
      })

      it('responds with 200 and all of the structures', () => {
        return supertest(app)
          .get('/api/structures')
          .expect(200, testStructures)
      })

    })
  })
})