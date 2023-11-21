

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetail {
  id: number;
  name: string;
}

export interface PokemonDetailResponse {
  weight: string;
  height: string;

  query: number;
  results: Pokemon[];
}

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface Pokemon {
  id: number;
  name: string;

}

export interface PokemonListResponse {
  results: Pokemon[];
}

export interface PokemonDetailResponse {
  pokemon: Pokemon;
}
