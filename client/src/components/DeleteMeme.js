import { useState } from "react";

function DeleteMeme({ id, handleDeleteMemes }) {
  const [isLoading, setIsLoading] = useState(false);

  function handleDeleteClick() {
    setIsLoading(true);
    fetch(`http://localhost:9292/memes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          handleDeleteMemes(id);
        } else {
          throw new Error("Failed to delete meme");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isLoading}
      className="shadow bg-red-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteMeme;
