import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider } from "@material-tailwind/react";

const customTheme = {
  button: {
    defaultProps: {
      color: "blue",
    },
  },
};

describe("Breadcrumb", () => {
  beforeEach(() => {
    render(
      <ThemeProvider value={customTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Breadcrumb />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  });

  it("renders home icon and breadcrumbs correctly", () => {
    const route = "/documents/123/editDocument";

    // Verificar que el icono de inicio se renderiza
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();

    // Verificar que los breadcrumbs se renderizan correctamente
    expect(screen.getByText("Documentos")).toBeInTheDocument();
    expect(screen.getByText("Editar Documento")).toBeInTheDocument();
  });

  it("renders dynamic breadcrumbs correctly", () => {
    const route = "/forum/456/editSuggestion";

    // Verificar que los breadcrumbs dinámicos se renderizan correctamente
    expect(screen.getByText("Foro")).toBeInTheDocument();
    expect(screen.getByText("Editar Queja o Sugerencia")).toBeInTheDocument();
  });
});
