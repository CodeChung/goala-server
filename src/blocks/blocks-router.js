const express = require('express');
const BlocksService = require('./blocks-service');
const RemindersService = require('../reminders/reminders-service');
const GoalsService = require('../goals/goals-service');
const requireAuth = require('../middleware/jwt-auth');

const blocksRouter = express.Router()
const jsonBodyParser = express.json()

blocksRouter
    .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, async (req, res, next) => {
        const ids = req.body
        BlocksService.getBlockSequence(req.app.get('db'), ids)
            .then(blocks => {
                return res.status(200).json(blocks)
            })
            .catch(next)
    })

blocksRouter
  .route('/title')
  .all(requireAuth)
  .post(jsonBodyParser, async (req, res, next) => {
    const { type } = req.headers
    const { typeId, title } = req.body
    const userId = req.user.id

    if (type === 'reminder') {
      RemindersService.updateReminderTitle(
        req.app.get('db'), userId, typeId, title
      )
    } else if (type === 'goal') {
      GoalsService.updateGoalTitle(
        req.app.get('db'), userId, typeId, title
      )
        .then(updatedGoal => res.status(200).json(updatedGoal))
        .catch(next)
    } else {
      return res.status(400).json({ error: { 
        message: 'Must provide type in header reminder or goal' } 
      })
    }
  })

blocksRouter
  .route('/block/:blockId')
  .all(requireAuth)
  .patch(jsonBodyParser, async (req, res, next) => {
      const user_id = req.user.id
      const { blockId } = req.params
      const { value } = req.body
      BlocksService.updateBlock(req.app.get('db'), user_id, blockId, value)
          .then(blocks => {
              return res.status(200).send(blocks)
          })
          .catch(next)
  })

blocksRouter
  .route('/new')
  .all(requireAuth)
  .post(jsonBodyParser, async (req, res, next) => {
    const userId = req.user.id
    const { newBlocks, goal_id, reminder_id } = req.body
    const updatedBlocks = await BlocksService.insertBlocks(req.app.get('db'), userId, newBlocks, goal_id, reminder_id).then(res => res)
    let response = JSON.stringify(updatedBlocks)
    res.status(201).json(updatedBlocks)
  })

blocksRouter
  .route('/goal/:goalId')
  .all(requireAuth)
  .patch(jsonBodyParser, (req, res, next) => {
    const { block_sequence } = req.body
    const { goalId } = req.params
    const user_id = req.user.id
    BlocksService.updateGoalSequence(req.app.get('db'), user_id, goalId, block_sequence)
      .then(updatedGoal => {
        return res.status(206).json(updatedGoal)
      })
  })

blocksRouter
    .route('/reminder/:reminderId')
    .all(requireAuth)
    .get((req, res, next) => {
      const reminderId = req.params.reminderId
      blocksService.getGoalByReminderId(req.app.get('db'), reminderId)
          .then(blocks => {
            console.log(blocks)
              // if (!blocks.length) {
              //     return res.status(404)
              //         .json({ error: 'block not found' })
              // }
              res.status(200).json(blocks)
          })
          .catch(next)
    })
    .patch(jsonBodyParser, (req, res, next) => {
      const { block_sequence } = req.body
      const { reminderId } = req.params
      const user_id = req.user.id
      BlocksService.updateReminderSequence(req.app.get('db'), user_id, reminderId, block_sequence)
        .then(updatedReminder => {
          return res.status(206).json(updatedReminder)
        })
    })

/* async/await syntax for promises */
async function checkBlock(req, res, next) {
    try {
      const thing = await ThingsService.getById(
        req.app.get('db'),
        req.params.thing_id
      )
  
      if (!thing)
        return res.status(404).json({
          error: `Thing doesn't exist`
        })
  
      res.thing = thing
      next()
    } catch (error) {
      next(error)
    }
  }
    
module.exports = blocksRouter