const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeStructureInventoryArray } = require('./structureInventory.fixtures')


describe('Structure Inventory Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE structure_inventory RESTART IDENTITY'))

  afterEach('cleanup', () => db.raw('TRUNCATE structure_inventory RESTART IDENTITY'))

  describe('GET /api/structureInventory', () => {
    context('Given no inventory', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/structureInventory')
          .expect(200, [])
      })
    })

    context('Given there are structure inventories in the database', () => {
      const testStructureInventory = makeStructureInventoryArray();

      beforeEach('insert structure inventory', () => {
        return db
          .into('structure_inventory')
          .insert(testStructureInventory)
      })

      it('responds with 200 and all of the inventory', () => {
        return supertest(app)
          .get('/api/structureInventory')
          .expect(200, testStructureInventory)
      })

    })
  })

  describe(`GET /api/structureInventory/:structure_id`, () => {
    context(`Given no structure inventories`, () => {
      it(`responds with 404`, () => {
        const structure_id = 123456
        return supertest(app)
          .get(`/api/structureInventory/${structure_id}`)
          .expect(404, { error: { message: `Structure Inventory doesn't exist` } })
      })
    })

    context('Given there are structure inventories in the database', () => {
      const testStructureInventory = makeStructureInventoryArray();

      beforeEach('insert structure inventory', () => {
        return db
          .into('structure_inventory')
          .insert(testStructureInventory)
      })
        it('responds with 200 and the specificed structure inventory', () => {
          const structure_id = 2
          const expectedStructureInventory = testStructureInventory[structure_id - 1]
          return supertest(app)
            .get(`/api/structureInventory/${structure_id}`)
            .expect(200, expectedStructureInventory)
        })
    })
  })

  describe(`PATCH /api/structureInventory/:structure_id`, () => {
    context(`Given no structure inventory`, () => {
      it(`responds with 404`, () => {
        const structure_id = 123456
        return supertest(app)
          .delete(`/api/structureInventory/${structure_id}`)
          .expect(404, { error: { message: `Structure Inventory doesn't exist` } })
      })
    })

    context('Given there is a structure inventory in the database', () => {
      const testStructureInventory = makeStructureInventoryArray();

      beforeEach('insert structure inventory', () => {
        return db
          .into('structure_inventory')
          .insert(testStructureInventory)
      })
      
      it('responds with 204 and updates the structure inventory', () => {
        const idToUpdate = 2
        const updateStructure = {
          "id": 2,
          "structure_name": "Synapse Clusters",
          "constructing_count": 0,
          "brood_count": 5,
          "constructable": true
        }
        const expectedStructure = {
          ...testStructureInventory[idToUpdate - 1],
          ...updateStructure
        }
        return supertest(app)
          .patch(`/api/structureInventory/${idToUpdate}`)
          .send(updateStructure)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/structureInventory/${idToUpdate}`)
              .expect(expectedStructure)
          )
      })
    })
  })
})