import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import CardPerPageSelector from "./PageSizeSelector";
import Link from "next/link";
import router from "next/router";
import { HomeProps, Pokemon } from "./types";



const Home: React.FC<HomeProps> = ({
  pokemons,
  total,
  limit: defaultLimit,
  page: defaultPage,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(pokemons);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [originalPokemons, setOriginalPokemons] = useState<Pokemon[]>(pokemons);
  const [error, setError] = useState<string | null>(null);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleSearch = async () => {
    try {
      let updatedList = originalPokemons;

      if (searchTerm.trim() !== "") {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
        );

        if (response.status === 404) {
          setError("Pokemon not found");
          return;
        }

        const data = await response.json();
        const searchedPokemon: Pokemon = { name: data.name, url: data.url };
        updatedList = [searchedPokemon];
        localStorage.setItem("searchTerm", searchTerm);
      } else {
        localStorage.removeItem("searchTerm");
      }

      setPokemonList(updatedList);
      setError(null);
      router.push({
        pathname: "/",
        query: { page: 1, limit, searchTerm },
      });
    } catch (error) {
      console.error("An error occurred during the search:", error);
      setError("An error occurred during the search");
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
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
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
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${newLimit}&offset=0`
    );
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
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchCompleted && !error && (
        <div>
          {pokemonList.length === 0 ? (
            <p>Not found</p>
          ) : (
            <ul>
              {pokemonList.map((pokemon) => (
                <li key={pokemon.name}>
                  <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                </li>
              ))}
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
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name}>
                <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              </li>
            ))}
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
  const defaultLimit = 20;
  const limit = query.limit
    ? parseInt(query.limit as string, 10)
    : defaultLimit;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const offset = (page - 1) * limit;
  const searchTerm = query.searchTerm ? query.searchTerm.toString() : "";

  let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  if (searchTerm) {
    apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
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
};

export default Home;
