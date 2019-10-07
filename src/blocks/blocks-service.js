const BlocksService = {
    insertBlock(db, block) {
        return db('blocks')
            .insert(block)
            .returning('*')
            .then(res => res[0])
    },
    getBlockById(db, blockId) {
        return db('blocks')
            .select('*')
            .where('id', blockId)
            .then(res => res)
    },
    getBlockSequence(db, ids) {
        return db('blocks')
            .select('*')
            .whereIn('id', ids)
    },
    updateBlock(db, user_id, id, value) {
        return db('blocks')
            .where('user_id', user_id)
            .where('id', id)
            .update({ value })
            .returning('*')
            .then(res => res[0])
    },
    updateGoalSequence(db, user_id, goal_id, block_sequence) {
        console.log(`id ${goal_id} NEWblock_sequence ${block_sequence} `)
        return db('goals')
            .where('user_id', user_id)
            .where('id', goal_id)
            .update({ block_sequence })
            .returning('*')
            .then(res => {
                // console.log(`Yo this is the new res ${Object.keys(res[0])}`)
                console.log('Our new goal: ',res[0])
                return res[0]
            })
    },




    // gets the sequence of block ids matching goalId
    async getBlocksByGoalId(db, goalId) {
        return db('goals')
            .select('block_sequence')
            .where('id', goalId)
            .then(blockSequence => {
                return this.mapBlockById(db, blockSequence)
            })
    },
    async getBlocksByReminderId(db, reminderId) {
        return db('reminders')
            .select('block_sequence')
            .where('id', reminderId)
            .then(blockSequence => {
                return this.mapBlockById(db, blockSequence)
            })
    },


    async mapBlockById(db, blockSequence) {
        return blockSequence.map(blockId => {
            return db('blocks')
                .select('*')
                .where('id', blockId)
        })
    },
    updateBlock(db, blockId, blockUpdates) {
        return db('blocks')
            .where('id', blockId)
            .update(blockUpdates)
    },
    deleteBlock(db, blockId) {
        return db('blocks')
            .where('id', blockId)
            .delete()
    }
}

module.exports = BlocksService