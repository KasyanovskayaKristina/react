import { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </>
    );
  }
}
