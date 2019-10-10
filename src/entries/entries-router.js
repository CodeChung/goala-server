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
    .route('/month/:month')
    .all(requireAuth)
    .get((req, res, next) => {
        const user_id = req.user.id
        const { month } = req.params
        EntriesService.getEntriesByMonth(
            req.app.get('db'),
            user_id,
            month
        )
            .then(entries => {
                return entries
            })
            .then(entries => res.status(200).json(entries))
            .catch(next)
            
    })

entriesRouter
    .route('/search/:keyword')
    .all(requireAuth)
    .get((req, res, next) => {
        const user_id = req.user.id
        const keyword = req.params.keyword
        EntriesService.getEntriesByKeyword(req.app.get('db'), user_id, keyword)
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
        EntriesService.getEntryById(req.app.get('db'), userId, date)
            .then(entry => {
                res.status(200).json(entry[0])
            })
            .catch(next)
    })

entriesRouter
    .route('/text/:entryId')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        const userId = req.user.id
        const { entryId } = req.params
        const { text } = req.body
        EntriesService.updateText(req.app.get('db'), userId, entryId, text)
            .then(entry => {
                res.status(304).json(entry)
            })
            .catch(next)
    })

entriesRouter
    .route('/title/:entryId')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        const userId = req.user.id
        const { entryId } = req.params
        const { title } = req.body
        EntriesService.updateTitle(req.app.get('db'), userId, entryId, title)
            .then(entry => {
                res.status(304).json(entry)
            })
            .catch(next)
    })
    
module.exports = entriesRouter