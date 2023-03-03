import React from "react";

const AddMeme = ({ handleAddMeme }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    image_url: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/memes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newMeme) => {
        handleAddMeme(newMeme);
        setFormData({
          title: "",
          image_url: "",
        });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="mr-20 mt-8">
      <form
        className="max-w-sm mx-auto mt-4 bg-slate-500 rounded-xl p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-900 text-2xl font-bold text-center pb-6">
          Add your meme here
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
            name="title"
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="image_url"
          >
            Image URL
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
            name="image_url"
            type="text"
            placeholder="Enter image URL"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-teal-800 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
