const Schedule = require('../models/scheduleModel');

exports.createSchedule = async (req, res) => {
    const userId = req.user.id;
    const {title, date, start_time, end_time} = req.body;

    if (!title || !date || !start_time || !end_time) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

     try {
        const scheduleId = await Schedule.createSchedule(userId, title, date, start_time, end_time);
        return res.status(200).json({ msg: 'Schedule added successfully', scheduleId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error inserting schedule' });
    }
};

exports.readSchedule = async (req, res) => {

    const userId = req.user.id;
    
    try {
        const schedules = await Schedule.getSchedulesByUserId(userId);
        return res.json(schedules);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Database error' });
    }
};

exports.updateSchedule = async (req, res) => {
    const userId = req.user.id;
    const scheduleId = req.params.id;
    const {title, date, start_time, end_time} = req.body;

    if(!title || !date || !start_time || !end_time){
        return res.status(400).json({msg: 'all fields are required'});
    }

    try {
        const schedule = await Schedule.getScheduleById(scheduleId, userId);
        if (!schedule) return res.status(404).json({ msg: 'Schedule not found' });

        await Schedule.updateSchedule(scheduleId, userId, title, date, start_time, end_time);
        return res.status(200).json({ msg: 'Schedule updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Failed to update schedule' });
    }

};

exports.deleteSchedule = async (req, res) => {
    const userId = req.user.id;
    const scheduleId = req.params.id;

    try {
        const schedule = await Schedule.getScheduleById(scheduleId, userId);
        if (!schedule) return res.status(404).json({ msg: 'Schedule not found or unauthorized' });

        await Schedule.deleteSchedule(scheduleId, userId);
        return res.json({ msg: 'Schedule deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Failed to delete schedule' });
    }
};


