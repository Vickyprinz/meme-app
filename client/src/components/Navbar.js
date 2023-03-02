import { Link } from 'react-router-dom';
import image from './images/image.jpg';

const Navbar = ({ isAuthenticated, handleLogout }) => {
return (
<nav className="bg-blue-700 flex items-center justify-around flex-wrap p-3">
<div class="image-box">
     <img src={image} alt="My image" /> 
          </div>
<div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
    
<Link to="/" className="text-lg font-bold leading-tight">
MEME CREATOR
</Link>
</div>
<div className="flex items-center flex-shrink-0 text-gray-800 font-bold justify-center">
<Link to="/" exact className=" ml-5">
Home
</Link>
{isAuthenticated ? (
<>
<Link to="/all-memes" exact className="ml-5">
All memes
</Link>
<Link to="/my-memes" exact className="ml-5">
My memes
</Link>
<Link onClick={handleLogout} exact className="ml-5">
Signout
</Link>
</>
) : (
<Link to="/signup" className="ml-5">
Signup
</Link>
)}
</div>
</nav>
);
};

export default Navbar;