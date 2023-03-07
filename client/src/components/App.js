import { Routes , Route, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Usermemes from './Usermemes'
import Memes from './Memes'
import Navbar from "./Navbar"
import Home from "./Home"
import Signup from './Signup'



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [memes, setMemes] = useState([])
  const [userMemes, setUserMemes] = useState([])
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('');

  
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  
  console.log(userMemes)

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    fetch('http://127.0.0.1:9292/login', {
      method: 'POST',
      body: formData,
    }) 
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network error.');
        }
      })
      .then(data => {
        setIsAuthenticated(true);
        setUsername(data.username); 
        setUserId(data.userId);
        navigate('/allmemes');
      })
      .catch(error => {
        console.error('error:', error);
      });
  };

  console.log(userId)

  const handleSignout = (e) => {
    e.preventDefault();
    fetch('http://localhost:9292/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setIsAuthenticated(false);
        navigate('/');
      } else {
        throw new Error('Failed to logout');
      }
    })
    .catch(error => console.error(error));
  };
  

useEffect(() => {
  fetch("http://localhost:9292/memes")
    .then((r) => r.json())
    .then((response) => setMemes(response.memes));
}, []);



useEffect(() => {
  fetch(`http://localhost:9292/user_memes/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUserMemes(data.memes);
    })
    .catch((error) => console.error(error));
}, [userId]);

const handleSearchChange = (value) => {
  console.log(value)
  setSearch(value);
};

const displayedMemes = memes.filter((meme) => meme.title.toLowerCase().includes(search.toLowerCase()))


const renderMymemes = () => {
  if (isAuthenticated) {
    return <Usermemes
                userId={userId}
                handleDeleteMemes={handleDeleteMemes}
                handleAddMemes={handleAddMemes} 
                handleEditMeme={handleEditMeme}
                userMemes={userMemes}
                setUserMemes={setUserMemes}
               
            />
  } else {
    navigate('/login');
  }
}



const handleEditMeme = (id, updatedMeme) => {
  fetch(`http://localhost:9292/users/${userId}/memes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedMeme)
  })
    .then(response => {
      if (response.ok) {
        const updatedMemes = userMemes.map(meme => {
          if (meme.id === id) {
            return { ...meme, ...updatedMeme };
          }
          return meme;
        });
        setUserMemes(updatedMemes);
      } else {
        throw new Error('Error.');
      }
    })
    .catch(error => {
      console.error('Error', error);
    });
};


  function handleDeleteMemes(id) {
    const updatedmemes = userMemes.filter((myMemes) => myMemes.id !== id);
    console.log("update delete message")
    setUserMemes(updatedmemes);
  }

  function handleAddMemes(newUserMemes) {
    setUserMemes([...userMemes, newUserMemes]);
  }



  return (
    <div className="">
      
        <Navbar isAuthenticated={isAuthenticated} handleSignout={handleSignout} username={username} />
        
        <Routes>
           <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated}  isAuthenticated={isAuthenticated} handleLogin={handleLogin}/>} />
           <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}  />} />
           {isAuthenticated && (
            <>
              <Route path="/memes" element={<memes memes={displayedMemes} displayedMemes={displayedMemes} handleSearchChange={handleSearchChange}/>} />
              <Route path="/usermemes" element={renderMymemes()}/>
            </>
           )}
        </Routes>
   </div>
  );
}

export default App;