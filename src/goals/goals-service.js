const GoalsService = {
    getGoalById(db, goalId) {
        return db('goals')
            .select('*')
            .where('id', goalId)
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
    insertGoal(db, goal) {
        return db
            .insert(goal)
            .into('goals')
            .returning('*')
            .then(res => {
                return this.getGoalsByUserId(db, goal.user_id)
            })
    },
    deleteGoal(db, goalId) {
        return db('goals')
            .where('id', goalId)
            .delete()
    }
}

module.exports = GoalsService