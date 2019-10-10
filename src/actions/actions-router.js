const express = require('express');
const path = require('path');
const ActionsService = require('./actions-service');
const requireAuth = require('../middleware/jwt-auth');

const actionsRouter = express.Router()
const jsonBodyParser = express.json()

actionsRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        ActionsService.getActionsByUserId(req.app.get('db'), userId)
            .then(actions => {
                // returns goal objects with matching userId
                res.status(200).json(actions)
            })
            .catch(next)
    })
    // Look at this later
    // .patch((req, res, next) => {
    //     const { actionUpdates } = req.body
        
    //     if (Object.keys(actionUpdates).length === 0) {
    //         return res.status(400).json({
    //             error: { message: `patch request must supply values`}
    //         })
    //     }
    //     actionsService.updateaction(req.app.get('db'), actionUpdates.id, actionUpdates)
    //         .then(updateaction => {
    //             logger.info(`reminder with id ${updateaction.id} updated`)
    //             res.status(204).end()
    //         })
    // })
    .post(jsonBodyParser, (req, res) => {
        const user_id = req.user.id
        const { title } = req.body
        const newAction = { user_id, title }
        ActionsService.insertAction(req.app.get('db'), newAction)
            .then(actions => {
                res.status(201).json(actions)
            })
    })
    // .delete()

actionsRouter
    .route('/:actionId')
    .all(requireAuth)
    .delete((req, res, next) => {
        const actionId = req.params
        const userId = req.user.id
        ActionsService.deleteAction(req.app.get('db'), userId, actionId.actionId)
            .then(actions => actions)
    })
    
module.exports = actionsRouter

