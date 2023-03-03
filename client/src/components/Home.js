import Signin from './Signin'

const Home = ({ isAuthenticated, handleLogin }) => {
  return (
    <div>
      {isAuthenticated ? (
        <p>Generate memes like a pro with our easy-to-use tool!</p>
      ) : (
        <div className=" bg-cover bg-center flex flex-col justify-cente items-center text-white">
          <Signin handleLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Home;
