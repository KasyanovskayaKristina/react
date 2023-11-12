import { useApi } from "../PokemonContext";
import "./PerPageSelect.css";
function PerPageSelect() {
  const {
    setCurrentPage,
    calculateTotalPages,
    fetchAllPokemon,
    setPerPage,
    perPage,
    displayPokemon,
  } = useApi();

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    calculateTotalPages(displayPokemon);
    fetchAllPokemon();
  };

  return (
    <div id="select-container">
      <label htmlFor="perPage">Cards per page:</label>
      <select
        onChange={(e) => handlePerPageChange(Number(e.target.value))}
        value={perPage}
        id="perPage"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  );
}

export default PerPageSelect;
