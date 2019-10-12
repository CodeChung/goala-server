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
            user_id: 1,
            title: 'exercise'
        },
        {
            user_id: 1,
            title: 'diet'
        },
        {
            user_id: 1,
            title: 'budgeting'
        },
        {
            user_id: 2,
            title: 'knitting'
        },
        {
            user_id: 2,
            title: 'karate'
        },
    ]
}

function makeGoalsArray() {
    return [
        {
            user_id: 1,
            action_id: 1,
            title: 'Yolo',
            last_logged: new Date(),
            schedule: {},
            countdown: 4,
            block_sequence: [1,2,3]
        },
        {
            user_id: 1,
            action_id: 2,
            title: 'Cholula',
            last_logged: new Date(),
            schedule: {},
            countdown: 21,
            block_sequence: [4,5,6]
        },
        {
            user_id: 1,
            action_id: 3,
            title: 'Third goal',
            last_logged: new Date(),
            schedule: {},
            countdown: 44,
            block_sequence: [7,8]
        },
        {
            user_id: 2,
            action_id: 4,
            title: 'Fourth Goal',
            last_logged: new Date(),
            schedule: {},
            countdown: 93,
            block_sequence: [9,10]
        },
        {
            user_id: 2,
            action_id: 5,
            title: '5 goal',
            last_logged: new Date(),
            schedule: {},
            countdown: 1,
            block_sequence: [11,12,13]
        },
    ]
}

function makeRemindersArray() {
    return [
        {
            user_id: 1,
            title: 'Reminder-1',
            date: new Date(),
            schedule: {},        
            block_sequence: [14,15,16]
        },
        {
            user_id: 1,
            title: 'Reminder-2',
            date: new Date(),
            schedule: {},        
            block_sequence: [17,18,19]
        },
        {
            user_id: 3,
            title: 'Reminder-3',
            date: new Date(),
            schedule: {},        
            block_sequence: [20,21]
        },
        {
            user_id: 1,
            title: 'Reminder-4',
            date: new Date(),
            schedule: {},        
            block_sequence: [22]
        },
        {
            user_id: 2,
            title: 'Reminder-5',
            date: new Date(),
            schedule: {},        
            block_sequence: [23,24]
        },
        {
            user_id: 3,
            title: 'Reminder-6',
            date: new Date(),
            schedule: {},        
            block_sequence: [25]
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
    const testGoals = makeGoalsArray()
    const testReminders = makeRemindersArray()

    return { testUsers, testActions, testBlocks, testGoals, testReminders }
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

function seedGoals(db, goals) {
    return db.into('goals').insert(goals)
        .then(() => {})
}

function seedBlocks(db, blocks) {
    return db.into('blocks').insert(blocks)
        .then(() => {})
}

function seedReminders(db, reminders) {
    return db.into('reminders').insert(reminders)
}

module.exports = {
    makeAuthHeader,
    makeActionsArray,
    makeBlocksArray,
    makeUsersArray,
    makeGoalsArray,
    makeRemindersArray,
    makeFixtures,
    cleanTables,
    seedUsers,
    seedActions,
    seedBlocks,
    seedGoals,
    seedReminders,
}