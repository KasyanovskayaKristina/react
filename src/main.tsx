import ReactDOM from "react-dom/client";
import App from "./pages/App/App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import React from "react";
import { store } from "./store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>
);
