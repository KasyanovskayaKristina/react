import { Component } from "react";
import { SearchInputProps, SearchInputState } from "../interface/interface";
import "./SearchInput.css";
class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.onSearch(searchTerm.trim());
    localStorage.setItem("searchTerm", searchTerm.trim());
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="search-form">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch} className="search-button">
          Search
        </button>
      </div>
    );
  }
}

export default SearchInput;
