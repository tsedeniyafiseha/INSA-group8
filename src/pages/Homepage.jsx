import React from 'react';

const Homepage = () => {
    // Inline styles as a JavaScript object
    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'right',
            padding: '30px 20px',
            backgroundColor: 'rgba(155, 67, 67, 1)'
        },
        homepageSection: {
            marginTop: 'auto',
            padding: '350px',
            background:'linear-gradient(to right, #617cbdff, #4bbe98ff)',
            margin: '15px 0'
        },
        homepageTitle: {
            textAlign: 'center',
            fontSize: '54px',
            color: '#2e2a2aff'
        },
        homepageDescription: {
            textAlign: 'center',
            fontSize: '26px',
            color: '#2b2626ff'
        }
    };

    return (
        <section style={styles.homepageSection}>
            <h1 style={styles.homepageTitle}>Navigate Your Campus with Ease</h1>
            <p style={styles.homepageDescription}>Welcome to our campus platform. Use the navigation above to explore.</p>
        </section>
    );
};

export default Homepage;