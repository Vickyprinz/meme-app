import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Navbar from './Navbar';
import Home from './Home';
import Meme from './Meme';
import Register from './Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    navigate('/');
  };
}