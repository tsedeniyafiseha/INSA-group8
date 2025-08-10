const db = require('../database/db');

exports.createSchedule = (req, res) => {
    const user_id = req.user.id;
    const {title, date, start_time, end_time} = req.body;

    if (!title || !date || !start_time || !end_time) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    const insertQuery = `INSERT INTO schedule (user_id, title, date, start_time, end_time) VALUES (?,?,?,?,?)`;

    db.run(insertQuery, [user_id, title, date, start_time, end_time], function(err) {
        if(err){
            return res.status(500).json({msg: 'error insering  schedule'});
        }

        return res.status(200).json({msg: 'schedule added successfully', scheduleId: this.lastID});
    });
};

exports.readSchedule = (req, res) => {

    const user_id = req.user.id;
    
    const checkQuery = `SELECT * FROM schedule WHERE user_id = ?`;

    db.all(checkQuery, [user_id], function(err, rows){
        if(err){
            return res.status(500).json({msg: 'database error'});
        }

            return res.json(rows);
        }); 
};

exports.updateSchedule = (req, res) => {
    const user_id = req.user.id;
    const schedule_id = req.params.id;
    const {title, date, start_time, end_time} = req.body;

    if(!title || !date || !start_time || !end_time){
        return res.status(400).json({msg: 'all fields are required'});
    }

    const checkQuery = `SELECT * FROM schedule WHERE id = ? and user_id = ?`;

    db.get(checkQuery, [schedule_id, user_id], (err, row) => {
        if(err){
            return res.status(500).json({msg: 'database error'});
        }
        if(!row){
            return res.status(404).json({msg: 'schedule not found'});
        }

    const updateQuery = `UPDATE schedule SET title = ?, date = ?, start_time = ?, end_time = ? WHERE id = ? and user_id = ?`;
    db.run(updateQuery, [title, date, start_time, end_time, schedule_id, user_id], function(err){
        if(err){
            return res.status(500).json({msg: 'failed to update schedule'});
        }

        return res.status(200).json({msg: 'schedule updated successully'});
    });

  });

};

exports.deleteSchedule = (req, res) => {
    const user_id = req.user.id;
    const schedule_id = req.params.id;

    const checkQuery = `SELECT * FROM schedule WHERE id = ? AND user_id = ?`;
    db.get(checkQuery, [schedule_id, user_id], (err, row) => {
        if (err) {
            return res.status(500).json({ msg: 'Database error' }); 
        }
        if (!row) {
            return res.status(404).json({ msg: 'Schedule not found or unauthorized' }); 
        }

        const deleteQuery = `DELETE FROM schedule WHERE id = ? AND user_id = ?`;
        db.run(deleteQuery, [schedule_id, user_id], function(err) {
            if (err) {
                return res.status(500).json({ msg: 'Failed to delete schedule' }); 
            }
            return res.json({ msg: 'Schedule deleted successfully' }); 
        });
    });
};


