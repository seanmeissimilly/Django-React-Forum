import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import Error404 from "../components/Error404";

describe("Error404 Component", () => {
  beforeEach(() => {
    render(<Error404 />);
  });
  test("renders the heading", () => {
    const heading = screen.getByRole("heading", {
      name: /¡Oops! Página no encontrada/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("renders the error icon", () => {
    const icon = screen.getByTestId("error-icon");
    expect(icon).toBeInTheDocument();
  });

  test("renders the error message", () => {
    const message = screen.getByText(/La página que buscas no existe/i);
    expect(message).toBeInTheDocument();
  });

  test("renders the link to the homepage", () => {
    const link = screen.getByRole("link", {
      name: /Volver a la página de inicio/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
