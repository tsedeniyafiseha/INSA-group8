import React, { useState } from 'react';
import './App.css'; // This is where we'll put the navigation bar styles
import Homepage from './pages/Homepage';
import MapPage from './pages/MapPage';
import Schedule from './pages/Schedule';
import LostFound from './pages/LostFound';


const App = () => {
    // We use useState to keep track of which page is currently active.
    const [activePage, setActivePage] = useState('home');

    // New state to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handler for login
    const handleLogin = () => {
        // Here you would show a login form
        // For now, we'll just toggle the state
        setIsLoggedIn(true);
        console.log('Login logic would be handled here.');
    };

    // Handler for logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('Logout logic would be handled here.');
    };

    // This function decides which component to show based on the activePage state.
    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <Homepage />;
            case 'map':
                return <MapPage />;
            case 'schedule':
                return < Schedule />;
            case 'lost-found':
                return <LostFound/>;
            default:
                return <Homepage />;
        }
    };

    return (
      <div className="App-container">
        <header className="navbar">
          <div className="logo">SCNAS</div>
          <ul>
            {/* The onClick handler updates the state, causing the page to re-render with the new content. */}
            <li><a href="#" className={activePage === 'home' ? 'active' : ''} onClick={() => setActivePage('home')}>Home</a></li>
            <li><a href="#" className={activePage === 'map' ? 'active' : ''} onClick={() => setActivePage('map')}>Campus Map</a></li>
            <li><a href="#" classname={activePage === 'faculty' ? 'active' : ''} onClick={() => setActivePage('faculty')}>Faculty</a></li>
            <li><a href="#" className={activePage === 'schedule' ? 'active' : ''} onClick={() => setActivePage('schedule')}>Schedule</a></li>
            <li><a href="#" className={activePage === 'lost-found' ? 'active' : ''} onClick={() => setActivePage('lost-found')}>Lost & Found</a></li>
          </ul>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <button className="sign-out-btn" onClick={handleLogout}>Sign Out</button>
            ) : (
              <button className="sign-in-btn" onClick={handleLogin}>Sign In</button>
            )}
          </div>
        </header>
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    );
};

export default App;