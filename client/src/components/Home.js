import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import MemeGenerator from "./Meme";
import "./style.css";

const Home = ({ setIsAuthenticated, myMemes }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [allMemes, setAllMemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      });
  }, []);

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    navigate("/allmemes");
    setIsAuthenticated(true);
  };

  return (
    <div className="box-container">
      <div className="bg-cover bg-center flex flex-col justify-center items-center text-white">
        <Signin handleSubmit={handleSigninSubmit} />
      </div>
      
      {showSignup && (
        <div className="bg-cover bg-center flex flex-col justify-center items-center text-white">
          <Signup setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
      
      {myMemes && (
        <div className="meme-container">
          {myMemes.map((meme) => (
            <MemeGenerator key={meme.id} memes={[meme]} />
          ))}
        </div>
      )}
      
      {allMemes && (
        <div className="meme-container">
          {allMemes.map((meme) => (
            <MemeGenerator key={meme.id} memes={[meme]} />
          ))}
        </div>
      )}
    </div>
  );
};


export default Home;
