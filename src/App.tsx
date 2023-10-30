import { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorBoundaryButton from "./components/ErrorBoundary/ErrorBoundaryButton";

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <Home />
          <ErrorBoundaryButton/>
        </ErrorBoundary>
      </>
    );
  }
}
