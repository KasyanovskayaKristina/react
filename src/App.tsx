import React, { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { Pokemon } from "./interface/interface";
import SelectPerPage from "./components/SelectPerPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerPage, setSelectedPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const perPageOptions = [3, 5, 10];

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${selectedPerPage * 10}`)
      .then((response) => response.json())
      .then(async (data) => {
        const results = data.results;
        const requests = results.map((pokemon: { url: RequestInfo | URL }) =>
          fetch(pokemon.url).then((response) => response.json())
        );
        const pokemonData = await Promise.all(requests);
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setNotFound(true);
      });
  }, [selectedPerPage]);

  const handleSearch = (text: string) => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.includes(text.toLowerCase())
    );
    if (filtered.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    setFilteredPokemon(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredPokemon.length / selectedPerPage);

  const displayPokemon = () => {
    const startIndex = (currentPage - 1) * selectedPerPage;
    const endIndex = startIndex + selectedPerPage;
    return filteredPokemon.slice(startIndex, endIndex);
  };

  return (
    <div className="main-content">
      <section>
        <SearchBar onSearch={handleSearch} />
        {notFound && <p className="not-found">Not Found</p>}
      </section>
      <section className="main-content_section">
        <SelectPerPage
          perPageOptions={perPageOptions}
          selectedPerPage={selectedPerPage}
          onChangePerPage={setSelectedPerPage}
        />
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {displayPokemon().map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
};

export default App;
