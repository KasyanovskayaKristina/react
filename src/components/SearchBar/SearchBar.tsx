import { useEffect } from "react";
import { useApi } from "../PokemonContext";
import "./Searchbar.css";
const SearchBar = () => {
  const {
    searching,
    setSearchQuery,
    searchQuery,
    handleInputChange,
    handleSearchClick,
  } = useApi();

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQuery");
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, [setSearchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for name"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearchClick} disabled={searching}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
