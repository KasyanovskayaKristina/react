import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import PokemonDetailPage from "../PokemonDetailsPage/PokemonDetailPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
    </Routes>
  );
};

export default App;
