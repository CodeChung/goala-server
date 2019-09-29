const EntriesService = {
    getEntryByDate(db, userId, date) {
        return db('journal_entries')
            .select('*')
            .where('user_id', userId)
            .where('date', date)
    },
    
    
      
    
    getEntryById(db, entryId) {
        return db('journal_entries')
            .select('*')
            .where('id', entryId)
    },  
    deleteEntry(db, entryId) {
        return db('journal_entries')
            .where('id', entryId)
            .delete()
    },
    getEntriesByUserId(db, userId) {
        return db('journal_entries')
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
            .into('journal_entries')
            .returning('*')
            .then(entry => {
                return this.getEntriesByUserId(db, entry.user_id)
            })
    },
    updateEntry(db, entryId, entryUpdates) {
        return db('journal_entries')
            .where('id', entryId)
            .update(entryUpdates)
            .then(entry => {
                return this.getEntryById(entryId)
            })
    },
}

module.exports = EntriesService