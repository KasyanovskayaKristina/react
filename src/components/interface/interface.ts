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
}
