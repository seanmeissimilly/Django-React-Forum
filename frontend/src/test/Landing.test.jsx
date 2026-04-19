import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "../components/Landing";

describe("Landing", () => {
  beforeEach(() => {
    render(<Landing />);
  });

  test("renders the main heading", () => {
    const heading = screen.getByText(/AlInfo/i);
    expect(heading).toBeInTheDocument();
  });
  test("renders the first paragraph", () => {
    const paragraph1 = screen.getByText(
      /Repositorio Virtual de Ingeniería Alimentaria./i
    );
    expect(paragraph1).toBeInTheDocument();
  });

  test("renders the second paragraph", () => {
    const paragraph2 = screen.getByText(
      /Facultad de Ingeniería Química, Cujae./i
    );
    expect(paragraph2).toBeInTheDocument();
  });

  test("renders the third paragraph", () => {
    const paragraph3 = screen.getByText(
      /Universidad Tecnológica de la Habana./i
    );
    expect(paragraph3).toBeInTheDocument();
  });
});
