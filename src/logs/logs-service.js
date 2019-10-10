const LogsService = {
    getLogByDate(db, userId, logId, date) {
        return db('logs')
            .select('*')
            .where('log_id', logId)
            .where('date', date)
            .where('user_id', userId)
    },
    createLog(db, userId, logId, date) {
        let reminder_id, goal_id
        if (logId[0] === 'r') {
            reminder_id = logId.slice(2, logId.length)
        } else if (logId[0] === 'g') {
            goal_id = logId.slice(2, logId.length)
        }

        return db('logs')
            .insert({
                user_id: userId,
                log_id: logId,
                date,
                goal_id,
                reminder_id,
            })
            .returning('*')
            .then(log => log)
    },
    updateLogValue(db, userId, logId, date, values) {
        this.getLogByDate(db, userId, logId, date)
            .then(log => {
                let value = log.value ? log.value : {}
                Object.keys(values).forEach(key => {
                    value[key] = values[key]
                })
                return db('logs')
                    .where('user_id', userId)
                    .where('log_id', logId)
                    .where('date', date)
                    .update({ value })
            })
    },


    getReminderById(db, reminderId) {
        return db('reminders')
            .select('*')
            .where('id', reminderId)
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

module.exports = LogsService