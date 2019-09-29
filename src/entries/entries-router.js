const express = require('express');
const path = require('path');
const EntriesService = require('./entries-service');
const requireAuth = require('../middleware/jwt-auth');

const entriesRouter = express.Router()
const jsonBodyParser = express.json()

entriesRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        EntriesService.getEntriesByUserId(req.app.get('db'), userId)
            .then(entries => {
                // returns goal objects with matching userId
                res.status(200).json(entries)
            })
            .catch(next)
    })
    .patch((req, res, next) => {
        const { entryUpdates } = req.body
        
        if (Object.keys(entryUpdates).length === 0) {
            return res.status(400).json({
                error: { message: `patch request must supply values`}
            })
        }
        entriesService.updateEntry(req.app.get('db'), entryUpdates.id, entryUpdates)
            .then(updateEntry => {
                logger.info(`reminder with id ${updateEntry.id} updated`)
                res.status(204).end()
            })
    })
    .post(jsonBodyParser, (req, res) => {
        const user_id = req.user.id
        const { title, date, text, blocks } = req.body
        const newEntry = { user_id, title, date, text, blocks }

        EntriesService.insertEntry(req.app.get('db'), newEntry)
            .then(entries => {
                res.status(201).json(entries)
            })
    })

entriesRouter
    .route('/search/:keyword')
    .all(requireAuth)
    .post((req, res, next) => {
        const user_id = req.user.id
        const keyword = req.params.keyword
        EntriesService.geEntriesByKeyword(req.app.get('db'), user_id, keyword)
            .then(entries => {
                if (!entries.length) {
                    return res.status(404)
                        .json({ error: 'entries not found' })
                }
                res.status(200).json(entries)
            })
            .catch(next)
    })

entriesRouter
    .route('/date/:date')
    .all(requireAuth)
    .get(jsonBodyParser, (req, res, next) => {
        const userId = req.user.id
        const { date } = req.params
        console.log('Date is ' , date)
        EntriesService.getEntryById(req.app.get('db'), userId, date)
            .then(entry => {
                // returns goal objects with matching userId
                console.log(`entry is ${entry[0].title}. date is ${entry[0].date}`)
                res.status(200).json(entry[0])
            })
            .catch(next)
    })
    
module.exports = entriesRouter