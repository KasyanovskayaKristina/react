import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList";

const mockPokemonList = [
  { name: "bulbasaur", id: 1 },
  { name: "charmander", id: 4 },
  { name: "squirtle", id: 7 },
];

describe("PokemonList component", () => {
  it("renders a list of Pokemon with links", () => {
    render(<PokemonList pokemonList={mockPokemonList} />);

    const pokemonItems = screen.getAllByRole("listitem");
    expect(pokemonItems).toHaveLength(mockPokemonList.length);

    mockPokemonList.forEach((pokemon) => {
      const link = screen.getByText(pokemon.name);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/pokemon/${pokemon.name}`);
    });
  });
});
