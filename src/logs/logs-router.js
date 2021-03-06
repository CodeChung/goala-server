const express = require('express');
const path = require('path');
const LogsService = require('./logs-service');
const requireAuth = require('../middleware/jwt-auth');

const logsRouter = express.Router()
const jsonBodyParser = express.json()

logsRouter
    .route('/log/:logId')
    .all(requireAuth)
    .post((req, res, next) => {
        const userId = req.user.id
        const logId = req.params.logId
        LogsService.createLog(req.app.get('db'), userId, logId)
            .then(newLog => {
                return newLog
            })

    })

logsRouter
    .route('/log/:logId/:date')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        const logId = req.params.logId
        const date = req.params.date
        LogsService.getLogByDate(req.app.get('db'), userId, logId, date)
            .then(logs => {
                return res.status(201).json(logs)
            })
            .catch(next)
    })
    .put(jsonBodyParser, (req, res, next) => {
        const userId = req.user.id
        const { logId, date } = req.params
        const { values } = req.body
        LogsService.updateLogValue(req.app.get('db'), userId, logId, date, values)
            .then(newLog => {
                return res.status(204).json(newLog)
            })
    })
    .post((req, res, next) => {
        const userId = req.user.id
        const logId = req.params.logId
        const date = req.params.date
        LogsService.createLog(req.app.get('db'), userId, logId, date)
            .then(newLog => {
                return newLog
            })
            .catch(next)

    })

module.exports = logsRouter