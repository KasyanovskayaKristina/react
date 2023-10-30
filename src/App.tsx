import "./App.css";
import Home from "./components/Home/Home";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorBoundaryButton from "./components/ErrorBoundary/ErrorBoundaryButton";

export function App() {
  return (
    <>
      <ErrorBoundary>
        <Home />
        <ErrorBoundaryButton />
      </ErrorBoundary>
    </>
  );
}
