import { Component } from "react";
import { DataDisplayState } from "./interface/interface";
import Card from "./Card";
import SearchInput from "./SearchInput";

export default class Home extends Component<object, DataDisplayState> {
  constructor(props: DataDisplayState) {
    super(props);
    this.state = {
      characters: [],
      error: null,
      isLoaded: false,
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
        this.setState({
          characters: data.results,
          error: null,
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };
  handleSearch = (searchTerm: string) => {
    this.fetchData(searchTerm);
  };
  render() {
    const { characters, error, isLoaded } = this.state;
    if (error) {
      return (
        <div>
          <h2>Error occurred: {error.message}</h2>
          <button
            onClick={() => {
              throw new Error("Test Error");
            }}
          >
            Throw Error
          </button>
        </div>
      );
    } else if (!isLoaded) {
      return <p>Loading ....</p>;
    } else {
      return (
        <div>
          <SearchInput onSearch={this.handleSearch} />
          {characters.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      );
    }
  }
}
