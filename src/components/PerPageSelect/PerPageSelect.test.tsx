import { render, screen, fireEvent } from "@testing-library/react";
import { ApiProvider } from "../PokemonContext";
import PerPageSelect from "./PerPageSelect";

test("Displays the correct number of cards per page", async () => {
  render(
    <ApiProvider>
      <PerPageSelect />
    </ApiProvider>
  );

  const dropdown = screen.getByLabelText("Cards per page:");
  fireEvent.change(dropdown, { target: { value: "10" } });

  expect(screen.getByDisplayValue("10")).toBeInTheDocument();
});
