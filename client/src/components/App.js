import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Home from './Home';
import Meme from './Meme';
import Signup from './Signup';
import Addpost from './Addpost';
import Customisedmeme from './Customisedmeme';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myMemes, setMyMemes] = useState([]);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    navigate('/');
  };

  // fetch memes
  useEffect(() => {
    fetch("http://localhost:9292/memes")
      .then((r) => r.json())
      .then((memes) => setMyMemes(memes));
  }, []);

  function handleDeleteMessage(id) {
    const updatedMemes = myMemes.filter((meme) => meme.id !== id);
    setMyMemes(updatedMemes);
  }

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated && (
          <>
            <Route path="/shelf" element={<Meme memes={myMemes} handleDeleteMessage={handleDeleteMessage} />} />
            <Route path="/addpost" element={<Addpost setMyMemes={setMyMemes} />} />
            <Route path="/customisedmeme" element={<Customisedmeme memes={myMemes} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
