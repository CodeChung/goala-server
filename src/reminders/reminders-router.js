const express = require('express');
const path = require('path');
const RemindersService = require('./reminders-service');
const requireAuth = require('../middleware/jwt-auth');

const remindersRouter = express.Router()
const jsonBodyParser = express.json()

remindersRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        RemindersService.getRemindersByUserId(req.app.get('db'), userId)
            .then(reminders => {
                // returns reminder objects with matching userId
                res.status(200).json(reminders)
            })
            .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const user_id = req.user.id
        const { title,  } = req.body
        const newReminder = { user_id, title }

        RemindersService.insertReminder(req.app.get('db'), newReminder)
            .then(reminder => {
                res.status(201).json(reminder)
            })
            .catch(next)
    })

remindersRouter
    .route('/date/:date')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        const { date } = req.params
        RemindersService.getRemindersByDate(req.app.get('db'), userId, date)
            .then(reminders => {
                res.status(200).json(reminders)
            })
            .catch(next)
    })

remindersRouter
    .route('/day/:day')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        const { day } = req.params
        RemindersService.getRemindersByDay(req.app.get('db'), userId, day)
            .then(reminders => {
                res.status(200).json(reminders)
            })
            .catch(next)
    })

remindersRouter
    .route('/:reminderId')
    .all(requireAuth)
    .get((req, res, next) => {
        const reminderId = req.params.reminderId
        const userId = req.user.id
        RemindersService.getReminderById(req.app.get('db'), userId, reminderId)
            .then(reminder => {
                if (!reminder.length) {
                    return res.status(404)
                        .json({ error: 'reminder not found' })
                }
                res.status(200).json(reminder)
            })
            .catch(next)
    })
    .patch((req, res, next) => {
        const reminderUpdates = req.body
        
        if (Object.keys(reminderUpdates).length === 0) {
            return res.status(400).json({
                error: { message: `patch request must supply values`}
            })
        }
        remindersService.updateReminder(req.app.get('db'), reminderUpdates.id, reminderUpdates)
            .then(updateReminder => {
                logger.info(`reminder with id ${req.id} updated`)
                res.status(204).end()
            })
    })
    .delete((req, res, next) => {
        const reminderId = req.params.reminderId
        const userId = req.user.id
        RemindersService.deleteReminder(req.app.get('db'), userId, reminderId)
            .then(reminderDeleted => {
                if (!reminderDeleted) {
                    return res.status(401)
                        .json({ error: 'Unable to delete reminder, try again'})
                }
                res.status(201)
            })
    })
    
module.exports = remindersRouter