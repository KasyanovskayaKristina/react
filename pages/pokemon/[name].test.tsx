import { render, screen, fireEvent } from "@testing-library/react";
import PokemonDetail from "./[name]";
import React from "react";
import { NextRouter } from "next/router";
import "@testing-library/jest-dom";


const mockedRouter: Partial<NextRouter> = {
  back: jest.fn(),
};

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => mockedRouter,
}));

describe("PokemonDetail component", () => {
  it("renders Pokemon name correctly", () => {
    const pokemon = { name: "bulbasaur" };
    render(<PokemonDetail pokemon={pokemon} />);
    const pokemonName = screen.getByText("bulbasaur");
    expect(pokemonName).toBeInTheDocument();
  });

  it("calls router.back() when Back button is clicked", () => {
    const pokemon = { name: "bulbasaur" };
    render(<PokemonDetail pokemon={pokemon} />);
    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(mockedRouter.back).toHaveBeenCalled();
  });
});
