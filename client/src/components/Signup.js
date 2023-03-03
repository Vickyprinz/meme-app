import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:9292/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/allmemes");
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full max-w-sm bg-slate-500 shodow-lg rounded-xl p-5 mt-20"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-gray-900 text-center mb-6 font-bold">
          Sign up
        </h1>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-username"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
              id="username"
              type="text"
              name="username"
              placeholder="Jane Doe"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-username"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
              id="email"
              type="email"
              name="email"
              placeholder="janedoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700" id="password" type="password" name="password" placeholder="******************" required/>
            </div>
          </div>
      
          <div class="md:flex md:items-center mb-5">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button  class="shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
               Signup
              </button>
            </div>
          </div>  
        </form>
      </div>
      
     )
}
 
export default Signup;