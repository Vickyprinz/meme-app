import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Home from './Home';
import Meme from './Meme';
import Signup from './Signup';
import AddMeme from './AddMeme'; // Corrected import
import CustomisedMeme from './CustomisedMeme'; // Corrected import

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
            <Route path="/addpost" element={<AddMeme setMyMemes={setMyMemes} />} /> {/* Corrected component name */}
            <Route path="/customisedmeme" element={<CustomisedMeme memes={myMemes} />} /> {/* Corrected component name */}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
