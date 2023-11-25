import React from "react";
import Link from "next/link";
import { Pokemon } from "../types";

interface PokemonListProps {
  pokemonList: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => (
  <ul>
    {pokemonList.map((pokemon) => (
      <li key={pokemon.name}>
        <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
      </li>
    ))}
  </ul>
);

export default PokemonList;
