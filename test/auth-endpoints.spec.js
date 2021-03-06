const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app')
const helpers = require('./test-helpers');

describe('Auth Endpoints', function() {
    let db

    const { testUsers } = helpers.makeFixtures()
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

    describe(`POST /api/auth/`, () => {
        beforeEach('insert users', () => {
            helpers.seedUsers(db, testUsers)
        })


        const requiredFields = ['username', 'password']

        for (const field of requiredFields) {
            const loginBody = {
                username: testUser.username,
                password: testUser.password
            }

            it(`responds with 400 error if ${field} is missing`, () => {
                delete loginBody[field]

                return supertest(app)
                    .post('/api/auth')
                    .send(loginBody)
                    .expect(400, {
                        error: `Missing ${field} in request body`,
                    })
            })    
        }

        it(`responds with 400 'Incorrect username' when bad username`, () => {
            const userInvalidName = {username: 'simothy', password: 'password'}

            return supertest(app)
                .post('/api/auth')
                .send(userInvalidName)
                .expect(400, {
                    error: 'Incorrect username'
                })
        })

        it(`responds with 400 'Incorrect password' when bad password`, () => {
            const userInvalidPass = { username: testUser.username, password: 'wrong'}

            return supertest(app)
                .post('/api/auth')
                .send(userInvalidPass)
                .expect(400, {
                    error: 'Incorrect password'
                })
        })
    })
})