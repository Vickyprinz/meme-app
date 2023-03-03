// import axios from "axios"
import React, { useState, useEffect } from "react";
import Addpost from "./Addpost";

const Meme = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:9292/memes");
      const jsonData = await response.json();
      setMemes(jsonData);
    };

    fetchData();
  }, []);

  const allMemes = memes.map((meme) => {
    return (
      <div
        key={meme.id}
        className="text-white p-4 mt-5 bg-slate-400 border ml-20  rounded-xl shadow"
      >
        <p className="">
          {" "}
          <span className="text-gray-900 font-bold">title: </span>{" "}
          {meme.title}{" "}
        </p>
        <p className="">
          {" "}
          <span className="text-gray-900 font-bold">punchline: </span>
          {meme.message}{" "}
        </p>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-2">
      <div className="">
        {allMemes}
      </div>
      <Addpost />
    </div>
  );
};

export default Meme;
