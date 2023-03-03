import AddMeme from "./AddMeme";
import DeleteMeme from "./DeleteMeme";


const Usermeme = ({ userMemes, handleDeleteMessage, handleAddMemes, handleUpdateMeme }) => {


  console.log(userMemes);

  const allMemes = userMemes.map(meme => {
    return (
      <div key={meme.id} className="text-white p-4 mt-5 bg-slate-400 border ml-20 rounded-xl shadow">
        <p className="">
          <span className="text-gray-900 font-bold">title: </span> {meme.title}
        </p>
        <p className="">
          <span className="text-gray-900 font-bold">comment: </span>
          {meme.message}
        </p>
        <DeleteMeme id={meme.id} userMemes={userMemes} handleDeleteMessage={handleDeleteMessage} />
      </div>
    );
  });

  return (
    <div className="grid grid-cols-2">
      <div className="">
        {allMemes}
      </div>
      <AddMeme handleAddMemes={handleAddMemes} />
    </div>
  );
};

export default Usermeme;
