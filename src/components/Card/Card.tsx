import { Component } from "react";
import { CardProps } from "../interface/interface";
import "./Card.css";

export default class Card extends Component<CardProps> {
  render() {
    const { character } = this.props;
    return (
      <div className="card">
        <h3>{character.name}</h3>
        <p>{character.species}</p>
        <img src={character.image} alt={character.name} />
      </div>
    );
  }
}
