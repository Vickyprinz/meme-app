import { formatDistance } from "date-fns";

const Memes = ({ memes }) => {
  const allMemes = memes.map((meme) => {
    const created = new Date(meme.created_at);
    const formattedDate = formatDistance(created, new Date(), {
      addSuffix: true,
    });

    return (
      <div
        key={meme.id}
        className="p-6 mb-6 bg-white rounded-lg shadow-md sm:p-10 lg:p-6"
      >
        <div className="flex items-center justify-between mb-2">
          {meme.user && (
            <p className="text-lg font-medium text-gray-700">
              {meme.user.username}
            </p>
          )}
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">
          {meme.title}
        </p>
        <p className="text-gray-700">{meme.message}</p>
      </div>
    );
  });

  return <div className="container mx-auto">{Memes}</div>;
};

export default Memes;
