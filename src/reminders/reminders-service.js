const RemindersService = {
    getReminderById(db, userId, reminderId) {
        return db('reminders')
            .select('*')
            .where('id', reminderId)
            .where('user_id', userId)
    },
    getRemindersByUserId(db, userId) {
        return db('reminders')
            .select('*')
            .where('user_id', userId)
    },
    getRemindersByDate(db, userId, reminderDate) {
        return db('reminders')
            .select('*')
            .where('user_id', userId)
            .then(reminders => reminders.filter(reminder => reminder.schedule.date === reminderDate))
    },
    getRemindersByDay(db, userId, day) {
        return db('reminders')
            .select('*')
            .where('user_id', userId)
            .then(reminders => reminders.filter(reminder =>  reminder && reminder.schedule && reminder.schedule.schedule && Number.isInteger(reminder.schedule.schedule.search(day))))

            
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