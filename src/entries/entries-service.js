const EntriesService = {
    deleteEntry(db, entryId) {
        return db('entries')
            .where('id', entryId)
            .delete()
    },
    getEntryById(db, entryId) {
        return db('entries')
            .select('*')
            .where('id', entryId)
    },
    getEntriesByUserId(db, userId) {
        return db('entries')
            .select('*')
            .where('user_id', userId)
    },
    getEntriesByKeyword(db, userId, keyword) {
        return this.getEntriesByUserId(db, userId)
            .then( entries => entries.filter(entry => entry.text.includes(keyword)) )
    },
    insertEntry(db, entry) {
        return db
            .insert(entry)
            .into('entries')
            .returning('*')
            .then(entry => {
                return this.getEntriesByUserId(db, entry.user_id)
            })
    },
    updateEntry(db, entryId, entryUpdates) {
        return db('entries')
            .where('id', entryId)
            .update(entryUpdates)
            .then(entry => {
                return this.getEntryById(entryId)
            })
    },
}

module.exports = EntriesService