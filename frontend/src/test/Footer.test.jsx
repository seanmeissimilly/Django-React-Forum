import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import Footer from "../components/Footer";
import { ThemeProvider } from "@material-tailwind/react";

describe("Footer Component", () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
  });

  test("renders Footer component with correct text", () => {
    expect(screen.getByText("© 2024 Alinfo")).toBeInTheDocument();
    expect(screen.getByText("Ayuda")).toBeInTheDocument();
    expect(screen.getByText("Acerca de")).toBeInTheDocument();
  });

  test("contains links with correct href attributes", () => {
    expect(screen.getByText("Ayuda").closest("a")).toHaveAttribute(
      "href",
      "/help"
    );
    expect(screen.getByText("Acerca de").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
  });

  test("applies correct styles to the footer", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "fixed inset-x-0 bottom-0 w-full bg-gray-400 p-3"
    );
  });
});
