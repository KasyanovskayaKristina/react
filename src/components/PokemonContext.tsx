import { ReactNode, createContext, useContext, useState } from "react";

export type Pokemon = {
  name: string;
};

type ApiContextType = {
  searchPokemon: (query: string) => Promise<Pokemon[]>;
  allPokemon: Pokemon[];
  searchResults: Pokemon[];
  searching: boolean;
  notFound: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchResults: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  setAllPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  fetchAllPokemon: () => void;
  performSearch: () => void;
  calculateTotalPages: (data: Pokemon[]) => void;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  displayPokemon: Pokemon[];
  setDisplayPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  selectPokemon: Pokemon | null;
  setSelectPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [displayPokemon, setDisplayPokemon] = useState<Pokemon[]>([]);
  const [selectPokemon, setSelectPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const fetchAllPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      const data = await response.json();
      setAllPokemon(data.results);
      calculateTotalPages(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateTotalPages = (data?: Pokemon[]) => {
    const totalItems = data ? data.length : allPokemon.length;
    const total = Math.ceil(totalItems / perPage);
    setTotalPages(total);
  };

  const searchPokemon = async (query: string): Promise<Pokemon[]> => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setNotFound(true);
        }
        throw new Error("Pokemon not found");
      }

      const data: Pokemon = await response.json();
      setNotFound(false);
      return [data];
    } catch (error) {
      setNotFound(true);
      return [];
    }
  };

  const performSearch = async () => {
    try {
      const cleanedQuery = searchQuery.trim();
      if (cleanedQuery === "") {
        setSearchResults([]);
        return;
      }

      setSearchResults(await searchPokemon(cleanedQuery));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const apiContextValue: ApiContextType = {
    searchPokemon,
    allPokemon,
    searchResults,
    searching,
    notFound,
    setSearching,
    setNotFound,
    setSearchResults,
    setAllPokemon,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    fetchAllPokemon,
    calculateTotalPages,
    performSearch,
    perPage,
    setPerPage,
    displayPokemon,
    setDisplayPokemon,
    selectPokemon,
    setSelectPokemon,
    isModalOpen,
    setIsModalOpen,
    error,
    setError,
  };

  return (
    <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi need to use in ApiProvider");
  }
  return context;
};
