import { useState } from "react";

const AddMeme = ({ handleAddMemes,userId}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:9292/users/${userId}/memes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        message: message,
      }),
    })
      .then((r) => r.json())
      .then((newMessage) => {
        handleAddMemes(newMessage);
        setMessage("");
        setTitle("");
      });
  }

  return (
    <div className="mx-10 my-8">
      <form
        className="max-w-sm mx-auto mt-4 bg-secondary rounded-xl p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-900 text-2xl font-bold text-center pb-6">
          Add Meme
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="bg-light-gray border border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
            name="title"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="message"
          >
           Comment
          </label>
          <textarea
            className="bg-light-gray border border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
            id="message"
            name="message"
            rows="3"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-primary hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeme;
