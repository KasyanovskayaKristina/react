import React from "react";
import styles from "./SearchBar.module.css";
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
  <div className={styles.container}>
    <input
      className={styles.input}
      data-testid="search-bar"
      type="text"
      placeholder="Enter Pokemon Name"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <button onClick={onSearch} disabled={isLoading} className={styles.button}>
      {isLoading ? "Loading..." : "Search"}
    </button>
  </div>
);

export default SearchBar;
