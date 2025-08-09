const db = require('../database/db');

exports.createSchedule = (req, res) => {
    const {user_id} = req.user.id;
    const {title, date, start_time, end_time} = req.body;

    if (!title || !date || !start_time || !end_time) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    const insertQuery = `INSERT INTO schedule (user_id, title, date, start_time, end_time) VALUES (?,?,?,?,?)`;

    db.run(insertQuery, [user_id, title, date, start_time, end_time], function(err) {
        if(err){
            return res.status(500).json({msg: 'error'});
        }

        return res.status(200).json({msg: 'schedule added successfully', scheduleId: this.lastID});
    })
}