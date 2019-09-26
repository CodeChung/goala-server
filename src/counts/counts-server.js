// const CountsService = {
//     getCountById(db, goalId) {
//         return db('Counts')
//             .select('*')
//             .where('id', goalId)
//     },
//     getCountsByUserId(db, userId) {
//         return db('Counts')
//             .select('*')
//             .where('user_id', userId)
//     },
//     getCountsByActionId(db, actionId) {
//         return db('Counts')
//             .select('*')
//             .where('action_id', actionId)
//     },
//     insertCount(db, count) {
//         return db
//             .insert(goal)
//             .into('Counts')
//             .returning('*')
//             .then(res => {
//                 return this.getCountsByUserId(db, goal.user_id)
//             })
//     },
//     deleteGoal(db, goalId) {
//         return db('Counts')
//             .where('id', goalId)
//             .delete()
//     }
// }

// module.exports = CountsService