const BlocksService = {
    async insertBlocks(db, user_id, blocks, goal_id, reminder_id) {
        const newBlocks = blocks.map(block => 
            ({
                index: block.index, 
                data: { user_id, reminder_id, goal_id, dimension: 'col-12', type: block.block.type, value: {} }
            }))
        let updatedBlocks = []
        for (let i = 0; i < newBlocks.length; i++) {
            const addedBlock = await this.insertNewBlock(db, newBlocks[i].data)
            updatedBlocks.push({ block: addedBlock, index: newBlocks[i].index })
        }
        return updatedBlocks
    },
    async insertNewBlock(db, newBlock) {
        return db('blocks')
            .insert(newBlock)
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
        return db('goals')
            .where('user_id', user_id)
            .where('id', goal_id)
            .update({ block_sequence })
            .returning('*')
            .then(res => {
                return res[0]
            })
    },
    updateReminderSequence(db, user_id, reminder_id, block_sequence) {
        return db('reminders')
            .where('user_id', user_id)
            .where('id', reminder_id)
            .update({ block_sequence })
            .returning('*')
            .then(res => {
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