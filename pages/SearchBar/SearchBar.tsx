import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  isLoading,
}) => (
  <div>
    <input
      type="text"
      placeholder="Enter Pokemon Name"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <button onClick={onSearch} disabled={isLoading}>
      {isLoading ? "Loading..." : "Search"}
    </button>
  </div>
);

export default SearchBar;
