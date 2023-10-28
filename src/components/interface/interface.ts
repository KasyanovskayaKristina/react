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
