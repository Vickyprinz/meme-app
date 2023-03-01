import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Navbar from './Navbar';
import Home from './Home';
import Meme from './Meme';
import Signup from './Signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    navigate('/');
  };
  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated && (
          <Route path="/shelf" element={<Meme />} />
        )}
      </Routes>
    </div>
  );
}
export default App;