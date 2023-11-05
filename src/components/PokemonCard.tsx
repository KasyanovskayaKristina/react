import React from "react";
import { Pokemon, PokemonCardProps } from "../interface/interface";
import "./PokemonCard.css";
const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
}: {
  pokemon: Pokemon;
}) => {
  return (
    <div className="card">
      <h3>Name: {pokemon.name}</h3>
      <h3>Height: {pokemon.height}</h3>
      <h3>Weight: {pokemon.weight}</h3>
    </div>
  );
};

export default PokemonCard;
