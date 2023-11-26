import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  test("renders page number correctly", () => {
    const onPageChange = jest.fn();
    render(<Pagination page={3} total={60} onPageChange={onPageChange} />);
    const pageElement = screen.getByText(/Page: 3/i);
    expect(pageElement).toBeInTheDocument();
  });

  test("clicking Previous Page button calls onPageChange with correct value", () => {
    const onPageChange = jest.fn();
    render(<Pagination page={3} total={60} onPageChange={onPageChange} />);
    const previousButton = screen.getByText(/Previous Page/i);
    fireEvent.click(previousButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("Previous Page button is disabled on the first page", () => {
    const onPageChange = jest.fn();
    render(<Pagination page={1} total={60} onPageChange={onPageChange} />);
    const previousButton = screen.getByText(/Previous Page/i);
    expect(previousButton).toBeDisabled();
  });

  test("Next Page button is disabled on the last page", () => {
    const onPageChange = jest.fn();
    render(<Pagination page={3} total={60} onPageChange={onPageChange} />);
    const nextButton = screen.getByText(/Next Page/i);
    expect(nextButton).toBeDisabled();
  });
});
