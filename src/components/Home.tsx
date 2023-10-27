import { Component } from "react";
import { DataDisplayState } from "./interface/interface";



export default class Home extends Component<object, DataDisplayState> {
  constructor(props: DataDisplayState) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ characters: data.results });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { characters } = this.state;
    return (
      <div>
        {characters.map((character) => (
          <div key={character.id}>
            <h3>{character.name}</h3>
            <p>{character.species}</p>
          </div>
        ))}
      </div>
    );
  }
}
