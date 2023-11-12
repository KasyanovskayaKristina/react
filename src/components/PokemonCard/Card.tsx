/*import { useNavigate, useSearchParams } from "react-router-dom";
import "./PokemonCard.css";
import { useEffect, useState } from "react";
import { Pokemon } from "../../interface/interface";
import { getPokemonById } from "../API/getApi";

const Card = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

  useEffect(() => {
    if (isLoading) {
      getPokemonById(parseInt(searchParams.get("id") || ""))
        .then((response) => {
          console.log(response);
          setPokemon(response);
        })
        .catch(() => {
          setPokemon({} as Pokemon);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading, searchParams]);

  const handleClose = () => {
    searchParams.delete("id");
    setSearchParams(searchParams);

    navigate("/pokemon");
  };

  const { name, sprites, height, weight } = pokemon;
  return (
    <div className="card" onClick={handleClose}>
      <div>
        <button onClick={handleClose}>Close</button>
      </div>
      <div>{name}</div>
      <div>{sprites}</div>
      <div>Location:{height}</div>
      <div>Species:{weight}</div>
    </div>
  );
};

export default Card;*/
