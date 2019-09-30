const moment = require('moment');

const EntriesService = {
   getEntriesByUserId(db, userId) {
        return db('journal_entries')
            .select('*')
            .where('user_id', userId)
    }, 

    getEntriesByMonth(db, userId, month) {
        // MONTH here is a integer index starting at 0. use moment.js
        return db('journal_entries')
            .select('*')
            .where('user_id', userId)
            // .where('month', month)
            .where('date', '>=', month)
            .where('date', '<', moment(month).add(1,'month').format('YYYY-MM-DD'))
    },



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