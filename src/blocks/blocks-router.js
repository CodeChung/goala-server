const express = require('express');
const path = require('path');
const BlocksService = require('./blocks-service');
const requireAuth = require('../middleware/jwt-auth');
const uuid = require('uuid');

const blocksRouter = express.Router()
const jsonBodyParser = express.json()

// blocksRouter
//     .route('/goal/:goalId')
//     .all(requireAuth)
//     .get((req, res, next) => {
//         const { goalId } = req.params
//         BlocksService.getblocksByGoalId(req.app.get('db'), goalId)
//             .then(blocks => {
//                 // returns goal objects with matching userId
//                 res.status(200).json(blocks)
//             })
//             .catch(next)
//     })
    // .post(jsonBodyParser, (req, res) => {
    //     const user_id = req.user.id
    //     const { action_id, title, schedule, blocks_sequence } = req.body
    //     const newGoal = { action_id, user_id, title, schedule, duration, blocks_sequence, last_logged }

    //     blocksService.insertGoal(req.app.get('db'), newGoal)
    //         .then(blocks => {
    //             res.status(201).json(blocks)
    //         })
    // })

blocksRouter
    .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, async (req, res, next) => {
        const ids = req.body
        BlocksService.getBlockSequence(req.app.get('db'), ids)
            .then(blocks => {
              console.log(`real travesty the orders fucked, ${ blocks}`)
                return res.status(200).json(blocks)
            })
            .catch(next)
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

    })

    // .delete((req, res, next) => {
    //     const goalId = req.params.goalId
    //     blocksService.deleteGoal(req.app.get('db'), goalId)
    //         .then(goalDeleted => {
    //             if (!goalDeleted) {
    //                 return res.status(401)
    //                     .json({ error: 'Unable to delete goal, try again'})
    //             }
    //             res.status(201)
    //         })
    // })

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