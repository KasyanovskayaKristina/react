import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar component", () => {
  it("renders input and button", () => {
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={() => {}}
        onSearch={() => {}}
        isLoading={false}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Pokemon Name");
    const buttonElement = screen.getByText("Search");

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onSearchChange when input value changes", () => {
    const mockOnSearchChange = jest.fn();
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearch={() => {}}
        isLoading={false}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Pokemon Name");
    fireEvent.change(inputElement, { target: { value: "charmander" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("charmander");
  });

  it("calls onSearch when button is clicked", async () => {
    const mockOnSearch = jest.fn();
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={() => {}}
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    const buttonElement = screen.getByText("Search");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalled();
    });
  });

  it("disables the button and shows 'Loading...' when isLoading is true", () => {
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={() => {}}
        onSearch={() => {}}
        isLoading={true}
      />
    );

    const buttonElement = screen.getByText("Loading...");
    expect(buttonElement).toBeDisabled();
  });
});
