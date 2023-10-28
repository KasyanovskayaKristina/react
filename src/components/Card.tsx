import { Component } from "react";
import { CardProps } from "./interface/interface";


export default class Card extends Component<CardProps> {
  render() {
    const { character } = this.props;
    return (
      <div className="main-container">
        <h3>{character.name}</h3>
        <p>{character.species}</p>
        <img src={character.image} alt={character.name} />
      </div>
    );
  }
}
