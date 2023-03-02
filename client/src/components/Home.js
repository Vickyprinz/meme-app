import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import "./style.css";

const Home = ({ setIsAuthenticated }) => {
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    navigate("/allmemes");
    console.log("go to home now");
    setIsAuthenticated(true);
  };

  return (
    <div className="box-container">
      <div className="bg-cover bg-center flex flex-col justify-center items-center text-white">
        <Signin handleSubmit={handleSigninSubmit} />
        {/* {!showSignup && (
          <button
            className="mt-2 text-sm text-white hover:text-gray-200"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        )} */}
      </div>
      {showSignup && (
        <div className="bg-cover bg-center flex flex-col justify-center items-center text-white">
          <Signup setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
    </div>
  );
};

export default Home;
