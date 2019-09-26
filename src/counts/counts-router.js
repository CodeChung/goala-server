// const express = require('express');
// const path = require('path');
// const CountsService = require('./counts-service');
// const requireAuth = require('../middleware/jwt-auth');
// const uuid = require('uuid');

// const countsRouter = express.Router()
// const jsonBodyParser = express.json()

// countsRouter
//     .route('/')
//     .all(requireAuth)
//     .get((req, res, next) => {
//         const userId = req.user.id
//         CountsService.getCountsByUserId(req.app.get('db'), userId)
//             .then(Counts => {
//                 // returns goal objects with matching userId
//                 res.status(200).json(Counts)
//             })
//             .catch(next)
//     })
//     .post(jsonBodyParser, (req, res) => {
//         const user_id = req.user.id
//         const { action_id, title, schedule, block_sequence } = req.body
//         const newGoal = { action_id, user_id, title, schedule, duration, block_sequence, last_logged }

//         CountsService.insertGoal(req.app.get('db'), newGoal)
//             .then(Counts => {
//                 res.status(201).json(Counts)
//             })
//     })

// CountsRouter
//     .route('/:goalId')
//     .all(requireAuth)
//     .get((req, res, next) => {
//         const goalId = req.params.goalId
//         CountsService.getGoalById(req.app.get('db'), goalId)
//             .then(goal => {
//                 if (!goal.length) {
//                     return res.status(404)
//                         .json({ error: 'Goal not found' })
//                 }
//                 res.status(200).json(goal)
//             })
//             .catch(next)
//     })
//     .delete((req, res, next) => {
//         const goalId = req.params.goalId
//         CountsService.deleteGoal(req.app.get('db'), goalId)
//             .then(goalDeleted => {
//                 if (!goalDeleted) {
//                     return res.status(401)
//                         .json({ error: 'Unable to delete goal, try again'})
//                 }
//                 res.status(201)
//             })
//     })
    
// module.exports = CountsRouter