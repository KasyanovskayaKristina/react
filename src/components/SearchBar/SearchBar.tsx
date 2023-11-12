import { useEffect } from "react";
import { useApi } from "../PokemonContext";
import "./Searchbar.css";
const SearchBar = () => {
  const {
    searching,
    setSearchQuery,
    searchQuery,
    setNotFound,
    performSearch,
    setSelectPokemon,
  } = useApi();

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQuery");
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, [setSearchQuery]);

  const handleSearchClick = async () => {
    //setCurrentPage(1);
    //setSearching(true);
    setNotFound(false);
    await performSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setSelectPokemon(null);
    localStorage.setItem("searchQuery", newSearchQuery);
  };

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
