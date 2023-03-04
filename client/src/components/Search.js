import { useState } from "react";

const Search = ({ handleSearchChange }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    handleSearchChange(value);
  };

  return (
    <form className="flex w-1/3 mt-10 ml-96">
      <ion-icon name="search"></ion-icon>
      <input
        name="search"
        type="text"
        placeholder="Search meme ....."
        className="bg-slate-200 rounded py-4 px-4 w-full text-gray-900 shadow-xl focus:outline-none focus:bg-slate-100 focus:shadow-outline mr-2"
        value={searchValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
