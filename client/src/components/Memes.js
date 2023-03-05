import { useState } from "react";
import "./style.css";

const Meme = () => {
  const [meme, setMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.imgflip.com/caption_image?template_id=${meme.id}&username=your_actual_username&password=your_actual_password&text0=${topText}&text1=${bottomText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMeme({ ...meme, url: data.data.url });
      })
      .catch((error) => console.log(error));
  };

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleRandomMeme = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => {
        const memes = data.data.memes;
        if (memes.length > 0) {
          const randomIndex = Math.floor(Math.random() * memes.length);
          const randomMeme = memes[randomIndex];
          setMeme(randomMeme);
        } else {
          console.log("No memes found!");
          setMeme({ url: "https://example.com/default-meme.jpg" });
        }
      })
      .catch(error => console.log(error));
  };
  

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {meme ? (
          <div className="meme-container">
            <img
              src={meme.url || meme.url}
              alt={meme.name}
              className="max-w-md my-5"
            />
            <div className="meme-text">
              <input
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={handleTopTextChange}
                className="my-2 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={handleBottomTextChange}
                className="my-2 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ) : (
          <p>Loading meme...</p>
        )}
        <div className="flex my-5">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleRandomMeme}
          >
            Random Meme
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!meme}
          >
            Generate Meme
          </button>
        </div>
      </form>
    </div>
  );
};

export default Meme;
