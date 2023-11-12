import { useApi } from "../PokemonContext";
import "./PerPageSelect.css";
function PerPageSelect() {
  const {
    setCurrentPage,
    calculateTotalPages,
    fetchAllPokemon,
    setPerPage,
    perPage,
  } = useApi();

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Сброс текущей страницы при изменении количества на странице
    calculateTotalPages(); // Пересчет общего количества страниц с учетом нового perPage
    fetchAllPokemon();
  };

  return (
    <div id="select-container">
      <label htmlFor="perPage">Cards per page:</label>
      <select
        onChange={(e) => handlePerPageChange(Number(e.target.value))}
        value={perPage}
        id="dropdown"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  );
}

export default PerPageSelect;
