import { useEffect } from "react";
import { Pokemon, useApi } from "../../components/PokemonContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import PerPageSelect from "../../components/PerPageSelect/PerPageSelect";
import CardDetail from "../../components/CardDetails/CardDetails";


const MainPage = () => {
  const {
    allPokemon,
    searchResults,
    searching,
    notFound,
    searchQuery,
    perPage,
    fetchAllPokemon,
    currentPage,
    calculateTotalPages,
    displayPokemon,
    setDisplayPokemon,
    setSelectPokemon,
    setIsModalOpen,
    isModalOpen,
    selectPokemon,
  } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      if (allPokemon.length === 0) {
        await fetchAllPokemon();
      }
    };

    fetchData();
  }, [allPokemon, fetchAllPokemon]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const displayed = searchQuery
      ? searchResults.slice(startIndex, endIndex)
      : allPokemon.slice(startIndex, endIndex);
    setDisplayPokemon(displayed);
  }, [allPokemon, currentPage, perPage, searchQuery, searchResults]);

  useEffect(() => {
    calculateTotalPages(allPokemon);
  }, [allPokemon, perPage]);

  const handlePokemonClick = (pokemon: Pokemon | null) => {
    setSelectPokemon(pokemon);
    setIsModalOpen(true);
  };

  return (
    <div>
      <SearchBar />
      <div>
        {searchQuery === ""
          ? displayPokemon.map((pokemon) => (
              <div key={pokemon.name}>
                <h3 onClick={() => handlePokemonClick(pokemon)}>
                  {pokemon.name}
                </h3>
              </div>
            ))
          : searchResults.map((pokemon) => (
              <div key={pokemon.name}>
                <h3 onClick={() => handlePokemonClick(pokemon)}>
                  {pokemon.name}
                </h3>
              </div>
            ))}
        {!searching && notFound && <p>Not Found</p>}
      </div>
      <Pagination />
      <PerPageSelect />
      {isModalOpen && selectPokemon && <CardDetail />}
    </div>
  );
};

export default MainPage;
