import React, { useState, useEffect } from "react";
import axios from 'axios';

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

  const [selectedMeme, setSelectedMeme] = useState(null);
  const [text, setText] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState(null);

  const handleMemeSelect = (event) => {
    const id = event.target.value;
    const meme = memes.find((meme) => meme.id === id);
    setSelectedMeme(meme);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      url: 'https://api.imgflip.com/caption_image',
      data: {
        template_id: selectedMeme.id,
        username: 'vickyprinz',
        password: '0794262715',
        text0: text,
        text1: text
      }
    };

    try {
      const response = await axios.request(options);
      setGeneratedMeme(response.data.data.url);
    } catch (error) {
      console.error(error);
    }
  };

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
      <div>
        <h2>Meme Generator</h2>
        <form onSubmit={handleSubmit}>
          <select onChange={handleMemeSelect}>
            <option value="">Select a meme</option>
            {memes.map((meme) => (
              <option key={meme.id} value={meme.id}>
                {meme.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter top text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit" disabled={!selectedMeme}>
            Generate Meme
          </button>
        </form>
        {generatedMeme && (
          <div>
            <img src={generatedMeme} alt="Generated Meme" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Meme;
