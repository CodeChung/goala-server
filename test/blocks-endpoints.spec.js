const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Blocks Endpoints', () => {
    let db

    const { testUsers, testActions, testBlocks, testGoals, testReminders } = helpers.makeFixtures()
    const testUser = testUsers[0]
    
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })
    
    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('/api/blocks', () => {
        context('POST', () => {
            beforeEach('insert users', () => {
                helpers.seedUsers(db, testUsers)
                helpers.seedActions(db, testActions)
                helpers.seedGoals(db, testGoals)
                helpers.seedReminders(db, testReminders)
                helpers.seedBlocks(db, testBlocks)
            })
            
            it(`responds 200 with blocks that match ids`, () => {
                const ids = [1,2,4]
                const expectedBlocks = testBlocks.filter(block => ids.includes(block.id))
                return supertest(app)
                    .post('/api/blocks')
                    .set('authorization', helpers.makeAuthHeader(testUser))
                    .set('Accept', 'application/json')
                    .send(ids)
                    .expect(200, expectedBlocks)
            })
        })
    })

})
