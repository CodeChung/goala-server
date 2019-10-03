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

        console.log(`Breaking news ${logId}, goals  ${ goal_id}  and reminders ${ reminder_id }`)

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