const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AuthService = require('../src/auth/auth-service')

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `bearer ${token}`
}

function makeActionsArray() {
    return [
        {
            id: 1,
            user_id: 1,
            title: 'exercise'
        },
        {
            id: 2,
            user_id: 1,
            title: 'diet'
        },
        {
            id: 3,
            user_id: 1,
            title: 'budgeting'
        },
        {
            id: 4,
            user_id: 2,
            title: 'knitting'
        },
        {
            id: 5,
            user_id: 2,
            title: 'karate'
        },
    ]
}

function makeBlocksArray() {
    return [
        {
            id: 1,
            user_id: 1,
            goal_id: 1,
            reminder_id: null,
            date: new Date(),
            type: 'weekly',                                    
            value: {"days": "Su"},
            dimension: 'col-12',
        },
        {
            id: 2,
            user_id: 1,
            goal_id: 1,
            reminder_id: null,
            date: new Date(),
            type: 'notes',                                    
            value: {"text": "This is a test"},
            dimension: 'col-8',
        },
        {
            id: 3,
            user_id: 1,
            goal_id: 1,
            reminder_id: null,
            date: new Date(),
            type: 'yesno',                                    
            value: {"yes": "true"},
            dimension: 'col-12',
        },
        {
            id: 4,
            user_id: 1,
            goal_id: 1,
            reminder_id: null,
            date: new Date(),
            type: 'checklist',                                    
            value: {"value": "1000 eucalyptus leaves", "checked": "false"},
            dimension: 'col-12',
        },
        {
            id: 5,
            user_id: 1,
            goal_id: null,
            reminder_id: 1,
            date: new Date(),
            type: 'weekly',                                    
            value: {"days": "Sa"},
            dimension: 'col-12',
        }
    ]
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
            users RESTART IDENTITY CASCADE
        `
    )
}

function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'bobby',
            name: 'bobby boucher',
            password: 'bouche'
        },
        {
            id: 2,
            username: 'timbo',
            name: 'timmy turner',
            password: 'timothy'
        },
        {
            id: 3,
            username: 'big_shiela',
            name: 'shiela jones',
            password: 'password'
        }
    ]
}

function makeFixtures() {
    const testUsers = makeUsersArray()
    const testActions = makeActionsArray()
    const testBlocks = makeBlocksArray()

    return { testUsers, testActions, testBlocks }
}

function seedUsers(db, users) {
    const bcryptUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    
    return db.into('users').insert(bcryptUsers)
        .then(() => {})
}

function seedActions(db, actions) {
    return db.into('actions').insert(actions)
        .then(() => {})
}

module.exports = {
    makeAuthHeader,
    makeActionsArray,
    makeBlocksArray,
    makeUsersArray,
    makeFixtures,
    cleanTables,
    seedUsers,
    seedActions,
}