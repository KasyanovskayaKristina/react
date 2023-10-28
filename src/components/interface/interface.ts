import { ReactNode } from "react";

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  created: string;
  episode: string;
}

export interface DataDisplayState {
  characters: Character[];
  error: Error | null;
  isLoaded: boolean;
  notFound: boolean;
  searchTerm: string;
}
export interface CardProps {
  character: Character;
}

export interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchInputState {
  searchTerm: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}