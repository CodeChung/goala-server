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
                console.log(`NEW LOG BABY OH YEAH`, newLog)
                
            })

    })

logsRouter
    .route('/log/:logId/:date')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        const logId = req.params.logId
        const date = req.params.date
        console.log('YUM', userId, logId, date)
        LogsService.getLogByDate(req.app.get('db'), userId, logId, date)
            .then(logs => {
                // console.log('FRESH LOGS>>>', res)
                return res.status(201).json(logs)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        const userId = req.user.id
        const logId = req.params.logId
        const date = req.params.date
        console.log('WAIT UP ', userId, logId, date)
        LogsService.createLog(req.app.get('db'), userId, logId, date)
            .then(newLog => {
                console.log(`NEW LOG BABY OH YEAH`, newLog)
                
            })
            .catch(next)

    })

module.exports = logsRouter