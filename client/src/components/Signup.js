import { useNavigate } from "react-router-dom"

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/allmemes')
    setIsAuthenticated(true)
  }

  return (
    <div className="flex justify-center items-center">
      <form className="w-full max-w-sm bg-slate-500 shodow-lg rounded-xl p-5 mt-20" onSubmit={handleSubmit}>
        <h1 className="text-2xl text-gray-900 text-center mb-6 font-bold">Sign Up</h1>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700" id="username" type="text" placeholder="Jane Doe" required />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username" id="email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700" id="email" type="email" placeholder="jane@example.com" required />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700" id="password" type="password" placeholder="******************" required />
          </div>
        </div>

        <div className="md:flex md:items-center mb-5">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup;
