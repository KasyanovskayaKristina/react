import { Component } from "react";
import { DataDisplayState } from "../interface/interface";
import Card from "../Card/Card";
import SearchInput from "../SearchInput/SearchInput";
import "./Home.css";
export default class Home extends Component<object, DataDisplayState> {
  constructor(props: DataDisplayState) {
    super(props);
    this.state = {
      searchTerm: "",
      characters: [],
      error: null,
      isLoaded: false,
      notFound: false,
    };
  }

  componentDidMount() {
    this.fetchData("");
  }
  fetchData = (searchTerm: string) => {
    let url = "https://rickandmortyapi.com/api/character";
    if (searchTerm) {
      url += `?name=${encodeURIComponent(searchTerm.trim())}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          this.setState({
            characters: data.results,
            notFound: false,
            isLoaded: true,
          });
        } else {
          this.setState({
            characters: [],
            isLoaded: true,
            notFound: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };
  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm: searchTerm.trim() }, () => {
      this.fetchData(this.state.searchTerm);
    });
  };
  render() {
    const { characters, isLoaded, notFound } = this.state;
    if (!isLoaded) {
      return <p>Loading ....</p>;
    } else {
      return (
        <div className="main-block">
          <div className="search">
            <SearchInput onSearch={this.handleSearch} />
          </div>
          <div className="card-block">
            {notFound ? (
              <p className="not-found">Not found</p>
            ) : (
              characters.map((character) => (
                <Card key={character.id} character={character} />
              ))
            )}
          </div>
        </div>
      );
    }
  }
}
