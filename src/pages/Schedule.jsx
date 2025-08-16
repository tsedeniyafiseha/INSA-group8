import React from 'react';

const styles = {
  scheduleContainer: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
  },
  scheduleLeftPanel: {
    background: 'linear-gradient(to right, #9ab1e2ff, #9cf8d9ff)',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '350px',
    flexShrink: 0,
  },
  scheduleMainView: {
    flexGrow: 1,
    backgroundColor: '#fdfdfdff',
    borderRadius: '3px',
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '30px',
  },
  title: { color: '#333', fontSize: '52px', fontWeight: 600 },
  subtitle: { color: '#443e3eff', fontSize: '25px', marginBottom: '25px' },
  calendarMini: {
    border: '4px solid #cef7e7',
    background: 'linear-gradient(to right, #9ab1e2ff, #9cf8d9ff)',
    borderRadius: '19px',
    marginBottom: '50px',
  },
  monthHeader: {
    backgroundColor: '#f7ececff',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    padding: '15px',
    textAlign: 'center',
  },
  dayName: { fontWeight: 'bold', fontSize: '12px', padding: '5px 0' },
  dayCellMini: {
    padding: '5px',
    border: '1px solid #eee',
    fontSize: '12px',
  },
  eventListToday: { marginBottom: '30px' },
  eventListTodayTitle: { fontSize: '25px', color: '#004d99' },
  eventListTodayP: { fontSize: '17px', margin: '5px 0' },
  quickActionsSection: { marginTop: '30px' },
  quickActionsTitle: { fontSize: '25px', color: '#004d99' },
  actionList: { listStyle: 'none', padding: '0', hover:'#2b41a3ff' },
  actionListItem: {
    padding: '10px 0',
    cursor: 'pointer',
    color: '#1b0f0fff',
    borderBottom: '1px solid #eee',
    transition: 'all 0.2s ease',
  },
  actionListItemhover:{
  background: '#136948ff',
  },
  actionListItemIcon: { marginRight: '10px', color: '#2a6dafff' },
  scheduleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  viewButtons: { display: 'flex', gap: '10px' },
  viewButton: {
    padding: '8px 15px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addEventButton: {
    backgroundColor: '#3b6896',
    color: '#1a201f',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addEventButtonHover:{
    color:'#0b6844ff'
  },
  weekGrid: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(7, 1fr)',
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  timeColumn: { borderRight: '1px solid #ddd' },
  timeSlot: {
    padding: '30px',
    height: '50px',
    borderBottom: '1px solid #ddd',
    fontSize: '12px',
    color: '#999',
    textAlign: 'right',
  },
  dayColumn: { borderRight: '1px solid #ddd' },
  dayHeader: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  daySlots: { minHeight: '720px', padding: '10px', position: 'relative' },
  eventItem: {
    backgroundColor: '#071a72',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    marginBottom: '5px',
  },
};

const SchedulePage = () => {
  const events = [
    { id: 1, title: 'CS 101: Computer Science', time: '09:00-10:20', day: 'Wed', date: 32 },
    { id: 2, title: 'Math 201: Calculus II', time: '10:30-12:00', day: 'Wed', date: 32 },
    { id: 3, title: 'Study Group Meeting', time: '14:00-16:00', day: 'Thu', date: 33 },
  ];

  const renderEventsForDay = (day) =>
    events
      .filter((event) => event.day === day)
      .map((event) => (
        <div key={event.id} style={styles.eventItem}>
          <p>{event.title}</p>
          <p>{event.time}</p>
        </div>
      ));

  return (
    <section style={styles.scheduleContainer}>
      <div style={styles.scheduleLeftPanel}>
        <h1 style={styles.title}>My Schedule</h1>
        <p style={styles.subtitle}>Manage your classes and campus events</p>

        <div style={styles.calendarMini}>
          <div style={styles.monthHeader}>July 2025</div>
          <div style={styles.calendarGrid}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day} style={styles.dayName}>{day}</span>
            ))}
            {[...Array(31).keys()].map((day) => (
              <div key={day} style={styles.dayCellMini}>{day + 1}</div>
            ))}
          </div>
        </div>

        <div style={styles.eventListToday}>
          <h3 style={styles.eventListTodayTitle}>Today's Events</h3>
          <p style={styles.eventListTodayP}>CS 101: Computer Science</p>
          <p style={styles.eventListTodayP}>Math 201: Calculus II</p>
        </div>

        <div style={styles.quickActionsSection}>
          <h3 style={styles.quickActionsTitle}>Quick Actions</h3>
          <ul style={styles.actionList}>
            <li style={styles.actionListItem}><i className="fas fa-bell" style={styles.actionListItemIcon}></i> Set Reminder</li>
            <li style={styles.actionListItem}><i className="fas fa-users" style={styles.actionListItemIcon}></i> Study Groups</li>
            <li style={styles.actionListItem}><i className="fas fa-map-marker-alt" style={styles.actionListItemIcon}></i> Room Finder</li>
          </ul>
        </div>
      </div>

      <div style={styles.scheduleMainView}>
        <div style={styles.scheduleHeader}>
          <h2>Week of July 31</h2>
          <div style={styles.viewButtons}>
            <button style={styles.viewButton}>Today</button>
            <button style={styles.viewButton}>Week</button>
            <button style={styles.viewButton}>Month</button>
            <button style={styles.addEventButton}>+ Add Event</button>
          </div>
        </div>

        <div style={styles.weekGrid}>
          <div style={styles.timeColumn}>
            {[...Array(12).keys()].map((i) => (
              <div key={i} style={styles.timeSlot}>{`${i + 7}:00`}</div>
            ))}
          </div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} style={styles.dayColumn}>
              <div style={styles.dayHeader}>{day} {31 + index}</div>
              <div style={styles.daySlots}>{renderEventsForDay(day)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchedulePage;

