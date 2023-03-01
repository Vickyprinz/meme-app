import React from "react";
import { Link } from "react-router-dom";

const Signin = ({ handleSubmit }) => {
  return (
    <form
      className="w-full max-w-sm bg-slate-300 shadow-lg rounded-xl p-5 mt-20"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl text-gray-900 text-center mb-6 font-bold">
        Signin
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
            id="inline-full-name"
            type="text"
            placeholder="name"
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
        <div className="md:w-2/3">
          <input
            className="bg-red-200 appearance-none border-2 border-red-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-700"
            id="inline-password"
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-5">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-700 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded
            "
            type="submit"
          >
            Signin
          </button>
        </div>
      </div>
      <div className="text-gray-900 pl-10 block">
        Dont have an account?
        <Link to="/register">
          <button className="shadow ml-8 bg-blue-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            sign up
          </button>
        </Link>
      </div>
    </form>
  );
};

export default Signin;
