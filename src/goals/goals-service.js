const GoalsService = {
    getGoalById(db, userId, goalId) {
        return db('goals')
            .select('*')
            .where('id', goalId)
            .where('user_id', userId)
    },
    getGoalsByUserId(db, userId) {
        return db('goals')
            .select('*')
            .where('user_id', userId)
    },
    getGoalsByActionId(db, actionId) {
        return db('goals')
            .select('*')
            .where('action_id', actionId)
    },
    getGoalsByDay(db, userId, day) {
        return db('goals')
            .select('*')
            .where('user_id', userId)
            .then(goals => goals.filter(goal => {
                return goal && !goal.schedule || goal && goal.schedule && goal.schedule.schedule && Number.isInteger(goal.schedule.schedule.search(day))
            }))
    },
    insertGoal(db, goal) {
        return db
            .insert(goal)
            .into('goals')
            .returning('*')
            .then(res => {
                return this.getGoalsByUserId(db, goal.user_id)
            })
    },
    updateGoalTitle(db, userId, goalId, title) {
        return db('goals')
            .where('id', goalId)
            .where('user_id', userId)
            .update({ title })
            .then(goal => {
                return this.getGoalById(db, userId, goalId)
            })
    },
    deleteGoal(db, userId, goalId) {
        return db('goals')
            .where('user_id', userId)
            .where('id', goalId)
            .delete()
    }
}

module.exports = GoalsService