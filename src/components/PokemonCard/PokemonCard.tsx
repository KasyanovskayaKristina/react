
import React from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div>
      <Link to={`/pokemon/${pokemon.id}`}>
        <h3>{pokemon.name}</h3>
      </Link>
    </div>
  );
};

export default PokemonCard;
