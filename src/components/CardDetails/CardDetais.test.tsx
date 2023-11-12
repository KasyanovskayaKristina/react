import { render, fireEvent } from "@testing-library/react";
import CardDetail from "./CardDetails";


test("close button should close the modal", () => {
  // Arrange
  const { container } = render(<CardDetail />);

  // Act
  const closeButton = container.querySelector(".close-button");
  if (closeButton) {
    fireEvent.click(closeButton);
  }

  // Assert
  const modal = container.querySelector(".card-detail-modal");
  expect(modal).not.toHaveClass("active");
});
