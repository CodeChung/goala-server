const RemindersService = {
    deleteReminder(db, userId, reminderId) {
        return db('reminders')
            .where('user_id', userId)
            .where('id', reminderId)
            .delete()
            .returning('*')
    },
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
            .then(reminders => reminders.filter(reminder =>  reminder && !reminder.schedule|| reminder && reminder.schedule && reminder.schedule.schedule && Number.isInteger(reminder.schedule.schedule.search(day))))

    },
    updateReminderTitle(db, userId, reminderId, title) {
        return db('reminders')
            .where('id', reminderId)
            .where('user_id', userId)
            .update({ title })
            .then(reminder => {
                return this.getReminderById(db, userId, reminderId)
            })
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
    },
    updateReminder(db, reminderId, reminderUpdates) {
        return db('reminders')
            .where('id', reminderId)
            .update(reminderUpdates)
    },
}

module.exports = RemindersService