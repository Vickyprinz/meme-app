import React from "react";

const Customisedmeme = ({ memes }) => {
  return (
    <div className="mt-10 pb-20 bg-slate-600">
      {memes.map((meme) => (
        <div
          key={meme.id}
          className="text-white p-4 mt-5 bg-slate-400 border w-2/4 ml-80 rounded-xl shadow"
        >
          <p>
            <span className="text-black-900 font-bold">title: </span>
            {meme.title}
          </p>
          <p>
            <span className="text-black-900 font-bold">Message: </span>
            {meme.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Customisedmeme;
