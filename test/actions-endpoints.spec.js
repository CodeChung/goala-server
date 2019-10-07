const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Actions Endpoints', () => {
    let db

    const { testUsers, testActions } = helpers.makeFixtures()
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

    describe('GET /api/actions', () => {
        context('Getting actions', () => {
            beforeEach('insert users', () => {
                helpers.seedUsers(db, testUsers)
                helpers.seedActions(db, testActions)
            })
            

            it(`responds 200 with actions that match user id`, () => {
                const expectedActions = testActions.filter(action => action.user_id === testUser.id)
                return supertest(app)
                    .get('/api/actions')
                    .set('authorization', helpers.makeAuthHeader(testUser))
                    .expect(200, expectedActions)
            })
        })
    })
})
