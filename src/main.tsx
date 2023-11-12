import ReactDOM from "react-dom/client";
import App from "./pages/App/App.tsx";
import "./index.css";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
