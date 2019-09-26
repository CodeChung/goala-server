const RemindersService = {
    getReminderById(db, reminderId) {
        return db('reminders')
            .select('*')
            .where('id', reminderId)
    },
    getRemindersByUserId(db, userId) {
        return db('reminders')
            .select('*')
            .where('user_id', userId)
    },
    getRemindersByActionId(db, actionId) {
        return db('reminders')
            .select('*')
            .where('action_id', actionId)
    },
    insertReminder(db, reminder) {
        return db
            .insert(reminder)
            .into('reminders')
            .returning('*')
            .then(res => {
                return this.getremindersByUserId(db, reminder.user_id)
            })
    },
    updateReminder(db, reminderId, reminderUpdates) {
        return db('reminders')
            .where('id', reminderId)
            .update(reminderUpdates)
    },
    deleteReminder(db, reminderId) {
        return db('reminders')
            .where('id', reminderId)
            .delete()
    }
}

module.exports = RemindersService