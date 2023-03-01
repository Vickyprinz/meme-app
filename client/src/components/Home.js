import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import Meme from './Meme';
import Register from './Register'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const history = useHistory();
  
    const handleLogout = (e) => {
      e.preventDefault();
      setIsAuthenticated(false);
      history.push('/');
    };
}  