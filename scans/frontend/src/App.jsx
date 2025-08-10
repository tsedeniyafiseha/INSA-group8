import React from 'react';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import './index.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {}
      <Navbar />

      {}
      <main className="flex-grow p-8 text-center">
        <p></p>
        {}
      </main>

      {}
      <Footer />
    </div>
  );
}

export default App;

