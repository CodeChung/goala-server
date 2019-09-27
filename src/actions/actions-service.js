const ActionsService = {
    insertAction(db, action) {
        return db
            .insert(action)
            .into('actions')
            .returning('*')
            .then(action => {
                return this.getActionById(db, action.id)
            })
    },
    getActionById(db, actionId) {
        return db('actions')
            .select('*')
            .where('id', actionId)
    },
    getActionsByUserId(db, userId) {
        return db('actions')
            .select('*')
            .where('user_id', userId)
    },
    deleteaction(db, actionId) {
        return db('actions')
            .where('id', actionId)
            .delete()
    },
    updateAction(db, actionId, actionUpdates) {
        return db('actions')
            .where('id', actionId)
            .update(actionUpdates)
            .then(action => {
                return this.getactionById(actionId)
            })
    },
}

module.exports = ActionsService