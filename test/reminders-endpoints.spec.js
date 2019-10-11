const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Reminders Endpoints', function() {
    let db

    const {
        testUsers,
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

    describe('GET /api/reminders', () => {
        beforeEach('insert users', () => helpers.seedUsers(db, testUsers))
        
        context(`Given no seeds`, () => {
            it(`responds with 200 and an empty object`, () => {
                return supertest(app)
                    .get('/api/entries')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [])
            })
        })
    })
})