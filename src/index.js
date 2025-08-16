import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // General styles for the entire app
import App from './App'; // Import our main App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
