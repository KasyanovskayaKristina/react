import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonDetailResponse, PokemonListResponse } from "./types";

export const api = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/pokemon?limit=100000",
  }),
  endpoints: (builder) => ({
    fetchPokemonList: builder.query<
      PokemonListResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) =>
        `pokemon?offset=${(page - 1) * pageSize}&limit=${pageSize}`,
    }),
    fetchPokemonDetails: builder.query<PokemonDetailResponse, string>({
      query: (name) => `https://pokeapi.co/api/v2/pokemon/${name}`,
    }),
    fetchDataBySearch: builder.query<PokemonListResponse, string>({
      query: (searchQuery) => `pokemon?search=${searchQuery}`,
    }),
    fetchAllPokemons: builder.query<PokemonListResponse, void>({
      query: () => "",
    }),
  }),
});

export const {
  useFetchPokemonListQuery,
  useFetchPokemonDetailsQuery,
  useFetchDataBySearchQuery,
  useFetchAllPokemonsQuery,
} = api;

