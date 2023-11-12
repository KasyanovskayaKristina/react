import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe } from "vitest";
import NotFound from "./NotFound";


describe("NotFound", () => {
  it("should have headline", () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    expect(
      screen.getByText<HTMLDivElement>(/Error 404 not found Page/i)
    ).toBeInTheDocument();
  });
});
