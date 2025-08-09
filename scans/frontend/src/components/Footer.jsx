// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icon-192.png'; // Make sure to have your logo in src

const Footer = () => {
  // Style objects
  const styles = {
    footer: {
      backgroundColor: 'white',
      padding: '1rem 0',
      borderTop: '1px solid #e5e7eb',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      color: '#1f2937',
      fontWeight: 'bold',
      fontSize: '1.1rem',
    },
    navList: {
      display: 'flex',
      listStyle: 'none',
      gap: '1.5rem',
      margin: '0',
      padding: '0',
    },
    navLink: {
      textDecoration: 'none',
      color: '#4b5563',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      transition: 'color 0.2s',
      fontSize: '0.95rem',
    },
    icon: {
      fontSize: '0.9rem',
    },
    // Media query styles
    '@media (max-width: 768px)': {
      content: {
        flexDirection: 'column',
        gap: '1rem',
      },
      navList: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
      },
    },
  };

  // Apply media queries (this is a simple approach)
  const applyMediaQueries = () => {
    if (window.innerWidth <= 768) {
      return {
        ...styles.content,
        flexDirection: 'column',
        gap: '1rem',
      };
    }
    return styles.content;
  };

  return (
    <footer style={styles.footer}>
      <div style={applyMediaQueries()}>
        <div className="footer-logo">
          <Link to="/" style={styles.logo}>
            <img src={logo} alt="SC NAS Logo" width="30" height="30" />
            <span>SC NAS</span>
          </Link>
        </div>
        
        <nav>
          <ul style={styles.navList}>
            <li>
              <Link to="/" style={styles.navLink}>
                <i className="fas fa-home" style={{ ...styles.icon, color: '#2563eb' }}></i>
                Home
              </Link>
            </li>
            <li>
              <Link to="/campus-map" style={styles.navLink}>
                <i className="fas fa-map" style={{ ...styles.icon, color: '#10b981' }}></i>
                Campus Map
              </Link>
            </li>
            <li>
              <Link to="/schedule" style={styles.navLink}>
                <i className="fas fa-calendar-alt" style={{ ...styles.icon, color: '#2563eb' }}></i>
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/bookings" style={styles.navLink}>
                <i className="fas fa-book" style={{ ...styles.icon, color: '#10b981' }}></i>
                Bookings
              </Link>
            </li>
            <li>
              <Link to="/lost-found" style={styles.navLink}>
                <i className="fas fa-search" style={{ ...styles.icon, color: '#2563eb' }}></i>
                Lost & Found
              </Link>
            </li>
            <li>
              <Link to="/signin" style={styles.navLink}>
                <i className="fas fa-sign-in-alt" style={{ ...styles.icon, color: '#10b981' }}></i>
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;