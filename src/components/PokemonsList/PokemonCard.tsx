import { Pokemon } from "../../types";

const PokemonCard: React.FC<Pokemon> = ({ name, id }) => (
  <div>
    <h3>{name}</h3>
    <h3>{id}</h3>
  </div>
);

export default PokemonCard;
