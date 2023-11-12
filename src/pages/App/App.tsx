import "./App.css";
import { ApiProvider } from "../../components/PokemonContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import CardDetail from "../../components/CardDetails/CardDetails";
import NotFound from "../../components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <ApiProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/details/:pokemonName" element={<CardDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApiProvider>
      </div>
    </Router>
  );
}

export default App;