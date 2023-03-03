import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Navbar";
import Home from "./Home";
import Usermemes from "./Usermemes"
import Signup from './Signup';
import Memes from './Memes';
import Usermeme from './Usermemes'
import { useNavigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [memes, setMemes] = useState([]);
  const [userMemes, setUserMemes] = useState([]);

  const navigate = useNavigate();

  console.log(memes);

  // login user
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch('http://127.0.0.1:9292/login', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network is not ok.');
        }
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUsername(data.username);
        navigate('/memes');
      })
      .catch((error) => {
        console.error('fetch operation error:', error);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('http://localhost:9292/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(false);
          navigate('/');
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch('http://localhost:9292/memes')
      .then((response) => response.json())
      .then((data) => {
        setMemes(data.memes);
        setUserMemes(data.user_memes);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleDeleteMemes(id) {
    const updatedMemes = userMemes.filter((meme) => meme.id !== id);
    console.log('delete message');
    setUserMemes(updatedMemes);
  }

  function handleAddMemes(newUserMeme) {
    setUserMemes([...userMemes, newUserMeme]);
  }

  function handleUpdateMeme(updatedMemeObj) {
    const updatedMemes = userMemes.map((meme) => {
      if (meme.id === updatedMemeObj.id) {
        return updatedMemeObj;
      } else {
        return meme;
      }
    });
    setUserMemes(updatedMemes);
  }

  return (
    <div className="bg-gray-600 h-screen">
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} username={username} />

      <Routes>
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated && (
          <>
            <Route path="/shelf" element={<Usermeme />} />
            <Route path="/allmemes" element={<Memes memes={memes}/>} />
            <Route path="/mymemes" element={<Usermemes userMemes={userMemes}
                                                handleDeleteMemes={handleDeleteMemes}
                                                handleAddMemes={handleAddMemes} 
                                                handleUpdateMeme={handleUpdateMeme}
              />} />
            </>
           )}
        </Routes>
   </div>
  );
}

export default App;
