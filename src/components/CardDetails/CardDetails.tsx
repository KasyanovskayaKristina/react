import { useApi } from "../PokemonContext";
import "./CardDetails.css";

const CardDetail = () => {
  const { setIsModalOpen, selectPokemon, isModalOpen } = useApi();
  if (!selectPokemon) {
    setIsModalOpen(false);
    return null;
  }

  return (
    <div className={`card-detail-modal ${isModalOpen ? "active" : ""}`}>
      <h2>{selectPokemon.name}</h2>
      <button
        onClick={() => {
          setIsModalOpen(false);
        }}
        className="close-button"
      >
        Close
      </button>
    </div>
  );
};

export default CardDetail;
