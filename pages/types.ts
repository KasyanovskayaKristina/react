export interface Pokemon {
  name: string;
  url: string;
}

export interface HomeProps {
  pokemons: Pokemon[];
  total: number;
  page: number;
  limit: number;
}

export interface PokemonDetailProps {
  pokemon: {
    name: string;
  };
}

export interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export interface CardPerPageSelectorProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}
