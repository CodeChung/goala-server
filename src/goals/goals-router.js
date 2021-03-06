const express = require('express');
const path = require('path');
const GoalsService = require('./goals-service');
const requireAuth = require('../middleware/jwt-auth');
const uuid = require('uuid');

const goalsRouter = express.Router()
const jsonBodyParser = express.json()

goalsRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        GoalsService.getGoalsByUserId(req.app.get('db'), userId)
            .then(goals => {
                // returns goal objects with matching userId
                res.status(200).json(goals)
            })
            .catch(next)
    })
    .post(jsonBodyParser, (req, res) => {
        const user_id = req.user.id
        const { title, action_id } = req.body
        const newGoal = { user_id, title, action_id }
        GoalsService.insertGoal(req.app.get('db'), newGoal)
            .then(goals => {
                res.status(201).json(goals)
            })
    })

goalsRouter
    .route('/day/:day')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        const day = req.params
        GoalsService.getGoalsByDay(req.app.get('db'), userId, day)
            .then(goals => {
                res.status(201).json(goals)
            })
    })

goalsRouter
    .route('/:goalId')
    .all(requireAuth)
    .get((req, res, next) => {
        const userId = req.user.id
        const goalId = req.params.goalId
        GoalsService.getGoalById(req.app.get('db'), userId, goalId)
            .then(goal => {
                if (!goal.length) {
                    return res.status(404)
                        .json({ error: 'Goal not found' })
                }
                res.status(200).json(goal)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const userId = req.user.id
        const { goalId } = req.params
        GoalsService.deleteGoal(req.app.get('db'), userId, goalId)
            .then(goals => goals)
    })
    
module.exports = goalsRouter