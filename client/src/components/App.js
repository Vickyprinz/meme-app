import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Signup from "./Signup";
import Memes from "./Memes";
import Usermemes from "./Usermemes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [memes, setMemes] = useState([]);
  const [userMemes, setUserMemes] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // login user
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch("http://127.0.0.1:9292/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network error.");
        }
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUsername(data.username);
        setUserId(data.userId);
        navigate("/memes");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    fetch("http://localhost:9292/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(false);
          navigate("/");
        } else {
          throw new Error("Failed to logout");
        }
      })
      .catch((error) => console.error(error));
  };

  // fetch all memes
  useEffect(() => {
    fetch("http://localhost:9292/memes")
      .then((r) => r.json())
      .then((response) => setMemes(response.memes));
  }, []);

  // fetch memes of authenticated user
  useEffect(() => {
    fetch(`http://localhost:9292/usermemes/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserMemes(data.memes);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const displayedMemes = memes.filter((meme) =>
    meme.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderUsermemes = () => {
    if (isAuthenticated) {
      return (
        <Usermemes
          userId={userId}
          userMemes={userMemes}
          setUserMemes={setUserMemes}
          handleDeleteMeme={handleDeleteMeme}
          handleAddMeme={handleAddMeme}
          handleUpdateMeme={handleUpdateMeme}
        />
      );
    } else {
      navigate("/login");
    }
  };

  function handleDeleteMeme(id) {
    const updatedMemes = userMemes.filter((meme) => meme.id !== id);
    setUserMemes(updatedMemes);
  }

  function handleAddMeme(newMeme) {
    setUserMemes([...userMemes, newMeme]);
  }

  function handleUpdateMeme(updatedMemeObj) {
    const updatedMemes = userMemes.map((message) => {
      if (message.id === updatedMemeObj.id) {
        return updatedMemeObj;
      } else {
        return message;
      }
    });
    setUserMemes(updatedMemes);
  }
  

  return (
    <div className="">
      
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} username={username} />
        
        <Routes>
           <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated}  isAuthenticated={isAuthenticated} handleLogin={handleLogin}/>} />
           <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}  />} />
           {isAuthenticated && (
            <>
              <Route path="/memes" element={<Memes memes={displayedMemes} displayedMemes={displayedMemes} handleSearchChange={handleSearchChange}/>} />
              <Route path="/usermemes" element={Usermemes()}/>
            </>
           )}
        </Routes>
   </div>
  );
}

export default App;