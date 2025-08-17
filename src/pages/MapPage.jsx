import React from 'react';

const styles = {
  bodyRoot: {
    backgroundColor: '#5e94caff',
    borderColor: '#d4dff5ff',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    fontFamily: 'sans-serif',
  },
  mapPageContainer: {
    display: 'flex',
    height: '100vh',
    padding: '10px',
    boxSizing: 'border-box',
    gap: '10px',
  },
  leftPanel: {
    background: 'linear-gradient(to right, #a9c1f7ff, #90f8d5ff)',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '300px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  introSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    color: '#374151',
    fontSize: '58px',
    fontWeight: 600,
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '25px',
    margin: '35px 0 0',
  },
  box: {
    backgroundColor: '#e7f0f8ff',
    border: '1px solid #9cafd6ff',
    borderRadius: '8px',
    padding: '20px',
  },
  boxTitle: {
    fontSize: '18px',
    color: '#0d6675ff',
    margin: '0 0 10px 0',
    fontWeight: '650',
  },
  searchBarContainer: {
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '20px 20px 20px 40px',
    border: '1px solid #e5e7eb',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
    color: '#355594ff',
  },
  actionList: { 
    listStyle: 'none',
    padding: '10px',
    margin: '15px 0',
  },
  actionItem: {
    padding: '10px 0',
    cursor: 'pointer', 
    color: '#1f2937',
    borderBottom: '1px solid #ced2daff',
    display: 'flex',
    alignItems: 'center',
    transition:'color 0.3s, textshadow 0.3s',
  },
  actionItemList: {
    borderBottom: 'none',
  },
  actionIcon: {
    marginRight: '15px',
    color: '#3157a8ff',
  },
    actionIconHover: {
        color: '#32995eff',
        textShadow: '0 0 10px #22b662ff, 0 0 20px #32995eff',
    },
  mapView: {
    flexGrow: 1,
    backgroundColor: '#e7f1f5ff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  interactiveMapPlaceholder: {
    height: '100%',
    width: '100%',
    background: "url('https://via.placeholder.com/1200x800.png?text=Interactive+Map+Placeholder') center/cover no-repeat",
  }, 
  };

const MapPage = () => {
  return (
    <section style={styles.mapPageContainer}>
      <div style={styles.leftPanel}>
        <div style={styles.introSection}>
          <h1 style={styles.title}>Campus Map</h1>
          <p style={styles.subtitle}>
            Navigate campus buildings and find your way around
          </p>
        </div>

        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Search</h2>
          <div style={styles.searchBarContainer}>
            <i className="fas fa-search" style={styles.searchIcon}></i>
            <input type="text" placeholder="Search buildings..." style={styles.searchInput} />
          </div>
        </div>

        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Quick Actions</h2>
          <ul style={styles.actionList}>
            <li style={styles.actionItem}>
              <i className="fas fa-street-view" style={styles.actionIcon}></i> My Location
            </li>
            <li style={styles.actionItem}>
              <i className="fas fa-route" style={styles.actionIcon}></i> Get Directions
            </li>
            <li style={styles.actionItem}>
              <i className="fas fa-building" style={styles.actionIcon}></i> Find Building
            </li>
            <li style={styles.actionItem}>
              <i className="fas fa-parking" style={styles.actionIcon}></i> Parking
            </li>
            <li style={{ ...styles.actionItem, ...styles.actionItemLast }}>
              <i className="fas fa-utensils" style={styles.actionIcon}></i> Dining
            </li>
          </ul>
        </div>
      </div>

      <div style={styles.mapView}>
        <div style={styles.interactiveMapPlaceholder}>
          {/* The interactive map would be rendered here */}
        </div>
      </div>
    </section>
  );
};

export default MapPage;
