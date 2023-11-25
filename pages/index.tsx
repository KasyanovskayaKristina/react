import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import router from "next/router";
import Pagination from "./Pagination/Pagination";
import CardPerPageSelector from "./PageSizeSelector/PageSizeSelector";
import { HomeProps, Pokemon, PokemonListData } from "./types";
import { API_BASE_URL, DEFAULT_LIMIT } from "./constants/constants";
import SearchBar from "./SearchBar/SearchBar";
import PokemonList from "./pokemonList/PokemonList";
import React from "react";

const Home: React.FC<HomeProps> = ({
  pokemons,
  total,
  limit: DEFAULT_LIMIT,
  page: defaultPage,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(pokemons);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [originalPokemons] = useState<Pokemon[]>(pokemons);
  const [error, setError] = useState<string | null>(null);
  const [searchCompleted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(url: string): Promise<Pokemon> {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      handleErrors(response);
      return await response.json();
    } finally {
      setIsLoading(false);
    }
  }

  const setPokemonListFromData = (data: PokemonListData) => {
    const pokemons = data.results || [{ name: searchTerm }];
    setPokemonList(pokemons);
  };

  const handleErrors = (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  };

  const handleSearch = async () => {
    try {
      let updatedList = originalPokemons;
      setIsLoading(true);
      if (searchTerm.trim() !== "") {
        const data = await fetchData(`${API_BASE_URL}/${searchTerm}`);
        const searchedPokemon: Pokemon = { name: data.name, url: data.url };
        updatedList = [searchedPokemon];
        localStorage.setItem("searchTerm", searchTerm);
      } else {
        localStorage.removeItem("searchTerm");
      }

      setPokemonListFromData({ results: updatedList });
      setError(null);
      router.push({
        pathname: "/",
        query: { page: 1, limit, searchTerm },
      });
    } catch (error) {
      console.error("An error occurred during the search:", error);
      setError("An error occurred during the search");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setPokemonList(originalPokemons);
    }
  }, [searchTerm, originalPokemons]);

  useEffect(() => {
    if (isInitialLoad) {
      setPokemonList(pokemons);
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, pokemons]);

  const handlePageChange = async (newPage: number) => {
    const offset = (newPage - 1) * limit;
    const response = await fetch(
      `${API_BASE_URL}?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    const pokemons: Pokemon[] = data.results;
    setPokemonList(pokemons);
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
    router.push({
      pathname: "/",
      query: { page: newPage, limit },
    });
  };

  const handleLimitChange = async (newLimit: number) => {
    setLimit(newLimit);
    const response = await fetch(`${API_BASE_URL}?limit=${newLimit}&offset=0`);
    const data = await response.json();
    const pokemons: Pokemon[] = data.results;
    setPokemonList(pokemons);
    setCurrentPage(1);
    router.push({
      pathname: "/",
      query: { page: 1, limit: newLimit },
    });
  };

  return (
    <div>
      <h1>Pokemon List</h1>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>
      {searchCompleted && !error && (
        <div>
          {pokemonList.length === 0 ? (
            <p>Not found</p>
          ) : (
            <ul>
              <PokemonList
                data-testid="pokemon-list"
                pokemonList={pokemonList}
              />
            </ul>
          )}
        </div>
      )}

      {!searchCompleted && !error && !isInitialLoad && (
        <div>
          <CardPerPageSelector
            limit={limit}
            onLimitChange={handleLimitChange}
          />
          <ul>
            <PokemonList data-testid="pokemon-list" pokemonList={pokemonList} />
          </ul>
          <Pagination
            page={currentPage}
            total={total}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const limit = query.limit
      ? parseInt(query.limit as string, 10)
      : DEFAULT_LIMIT;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const offset = (page - 1) * limit;
    const searchTerm = query.searchTerm ? query.searchTerm.toString() : "";

    let apiUrl = `${API_BASE_URL}?limit=${limit}&offset=${offset}`;

    if (searchTerm) {
      apiUrl = `${API_BASE_URL}/${searchTerm}`;
    }

    const response = await fetch(apiUrl);

    if (response.status === 404 && searchTerm) {
      return {
        props: {
          pokemons: [{ name: searchTerm }],
          total: 1,
          limit,
          page,
          isInitialLoad: true,
        },
      };
    }

    const data = await response.json();
    const pokemons = data.results || [{ name: searchTerm }];

    return {
      props: {
        pokemons,
        total: data.count || 1,
        limit,
        page,
        isInitialLoad: true,
      },
    };
  } catch (error) {
    console.error("An error occurred during data fetching:", error);
    return {
      props: {
        pokemons: [],
        total: 0,
        limit: DEFAULT_LIMIT,
        page: 1,
        isInitialLoad: true,
      },
    };
  }
};
export default Home;
