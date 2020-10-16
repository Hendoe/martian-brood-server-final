const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeAlienInventoryArray } = require('./alienInventory.fixtures')


describe('Alien Inventory Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE alien_inventory RESTART IDENTITY'))

  afterEach('cleanup', () => db.raw('TRUNCATE alien_inventory RESTART IDENTITY'))

  describe('GET /api/alienInventory', () => {
    context('Given no inventory', () => {
      it('responds with 200 and an empty list', () => {
        db.select('*').from('alien_inventory').then((data) => console.log('DATA FROM A INV', data))
        return supertest(app)
          .get('/api/alienInventory')
          .expect(200, [])
      })
    })

    context('Given there are alien inventories in the database', () => {
      const testAlienInventory = makeAlienInventoryArray();

      beforeEach('insert alien inventory', () => {
        return db
          .into('alien_inventory')
          .insert(testAlienInventory)
      })

      it('responds with 200 and all of the inventory', () => {
        return supertest(app)
          .get('/api/alienInventory')
          .expect(200, testAlienInventory)
      })

    })
  })

  describe(`GET /api/alienInventory/:alien_id`, () => {
    context(`Given no alien inventories`, () => {
      it(`responds with 404`, () => {
        const alien_id = 123456
        return supertest(app)
          .get(`/api/alienInventory/${alien_id}`)
          .expect(404, { error: { message: `Alien Inventory doesn't exist` } })
      })
    })

    context('Given there are alien inventories in the database', () => {
      const testAlienInventory = makeAlienInventoryArray();

      beforeEach('insert alien inventory', () => {
        return db
          .into('alien_inventory')
          .insert(testAlienInventory)
      })

      it('responds with 200 and the specificed alien inventory', () => {
        //we use alien_id -1 because the id's start at one, but we are using an array which starts at 0
        const alien_id = 1
        const expectedAlienInventory = testAlienInventory[alien_id - 1]
        return supertest(app)
          .get(`/api/alienInventory/${alien_id}`)
          .expect(200, expectedAlienInventory)
      })
    })
  })
 
  describe(`PATCH /api/alienInventory/:alien_id`, () => {
    context(`Given no alien inventory`, () => {
      it(`responds with 404`, () => {
        const alien_id = 123456
        return supertest(app)
          .delete(`/api/alienInventory/${alien_id}`)
          .expect(404, { error: { message: `Alien Inventory doesn't exist` } })
      })
    })
  
    context('Given there is a alien inventory in the database', () => {
      const testAlienInventory = makeAlienInventoryArray();
  
      beforeEach('insert alien inventory', () => {
        return db
          .into('alien_inventory')
          .insert(testAlienInventory)
      })
        
      it('responds with 204 and updates the alien inventory', () => {
        const idToUpdate = 1
        const updateAlien = {
          "id": 1,
          "alien_name": "Worker Drone",
          "brood_count": 9,
          "spawnable": true
        }
        const expectedAlien = {
          ...testAlienInventory[idToUpdate - 1],
          ...updateAlien
        }
        return supertest(app)
          .patch(`/api/alienInventory/${idToUpdate}`)
          .send(updateAlien)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/alienInventory/${idToUpdate}`)
              .expect(expectedAlien)
          )
      })
    })
  })
})