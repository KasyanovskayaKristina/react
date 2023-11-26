import React from "react";
import Link from "next/link";
import { Pokemon } from "../types";
import styles from "./PokemonList.module.css";


interface PokemonListProps {
  pokemonList: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => (
  <ul className={styles.ul}>
    {pokemonList.map((pokemon) => (
      <li key={pokemon.name} className={styles.li}>
        <Link href={`/pokemon/${pokemon.name}`} className={styles.link}>
          {pokemon.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default PokemonList;
