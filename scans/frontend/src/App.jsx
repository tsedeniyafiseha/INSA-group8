import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import FacultyDirectory from "./pages/FacultyDirectory";
import ResetPassword from "./pages/ResetPassword";

import Aipage from "./pages/Aipage"; 

function App() {
  const location = useLocation();

 
  const authPages = ["/signup", "/signin", "/reset-password"];
  const hideLayout = authPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className={`flex-grow ${!hideLayout ? "p-8" : ""}`}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/faculty" element={<FacultyDirectory />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}

      {/* Show Chatbot only on non-auth pages */}
      {!hideLayout && <Aipage />}
    </div>
  );
}

export default App;
