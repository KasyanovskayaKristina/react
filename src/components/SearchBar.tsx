import React, { useState } from "react";
import "./Searchbar.css";
interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem("searchText") || ""
  );

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    setSearchText(text);
    localStorage.setItem("searchText", text);
    onSearch(text);
  };

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </div>
  );
};

export default SearchBar;
