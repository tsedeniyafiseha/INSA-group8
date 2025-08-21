const db = require('../database/db');

const createSchedule = (userId, title, date, startTime, endTime) => {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO schedule (user_id, title, date, start_time, end_time) VALUES (?,?,?,?,?)`;
        db.run(insertQuery, [userId, title, date, startTime, endTime], function(err) {
            if (err) return reject(err);
            resolve(this.lastID); 
        });
    });
}; 

const getSchedulesByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM schedule WHERE user_id = ?`;
        db.all(query, [userId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const getScheduleById = (scheduleId, userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM schedule WHERE id = ? AND user_id = ?`;
        db.get(query, [scheduleId, userId], (err, row) => {
            if (err) return reject(err);
            resolve(row || null);
        });
    });
};

const updateSchedule = (scheduleId, userId, title, date, startTime, endTime) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE schedule SET title = ?, date = ?, start_time = ?, end_time = ? WHERE id = ? AND user_id = ?`;
        db.run(query, [title, date, startTime, endTime, scheduleId, userId], function(err) {
            if (err) return reject(err);
            resolve(this.changes); 
        });
    });
};

const deleteSchedule = (scheduleId, userId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM schedule WHERE id = ? AND user_id = ?`;
        db.run(query, [scheduleId, userId], function(err) {
            if (err) return reject(err);
            resolve(this.changes); 
        });
    });
};

module.exports = {
    createSchedule,
    getSchedulesByUserId,
    getScheduleById,
    updateSchedule,
    deleteSchedule
};