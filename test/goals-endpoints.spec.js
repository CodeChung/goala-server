const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Goals Endpoints', function() {
    let db

    const {
        testUsers,
        testGoals,
    } = helpers.makeFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })

        app.set('db', db)
    })

    after('disconnection from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/goals', () => {
        beforeEach('insert users', () => helpers.seedUsers(db, testUsers))
        
        context(`Given no seeds`, () => {
            it(`responds with 200 and an empty array`, () => {
                return supertest(app)
                    .get('/api/goals')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [])
            })
        })
        context(`Given there are goals in the database`, () =>  {
            beforeEach('insert goals', () => {
                helpers.seedGoals(db, testGoals)
            })

            it(`responds with 200 and object of entries for specific id`, () => {
                const user = testUsers[0]
                const userId = user.id
                const goals = testGoals.filter(goal => goal.user_id === userId)
            
                return supertest(app)
                    .get('/api/goals')
                    .set('Authorization', helpers.makeAuthHeader(user))
                    .expect(200, goals)
            })
        })
    })
})