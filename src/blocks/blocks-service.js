const BlocksService = {
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


    insertBlock(db, block) {
        return db
            .insert(block)
            .into('blocks')
            .returning('*')
            .then(res => {
                return this.getblocksByUserId(db, block.user_id)
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