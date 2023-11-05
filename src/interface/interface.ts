import { ReactNode } from "react";

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  sprites: string;
  height: number;
  weight: number;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
}

export interface PaginationProps {
  totalPages: number;
  children: React.ReactNode;
  location: Location;
}

export interface PaginationProps {
  totalPages: number;
}

export interface SelectPerPageProps {
  perPageOptions: number[];
  selectedPerPage: number;
  onChangePerPage: (perPage: number) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface ErrorButton {
  hasError: boolean;
}
