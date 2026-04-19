import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi, beforeEach, test } from "vitest";
import Modal from "../components/Modal";
import { ThemeProvider } from "@material-tailwind/react";

describe("Modal", () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Modal onClose={() => {}} onConfirm={() => {}}>
          <p>Contenido del modal</p>
        </Modal>
      </ThemeProvider>
    );
  });
  test("should render the modal with children content", () => {
    expect(screen.getByText("⚠️ Atención ⚠️")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  test("should call onClose when Cancelar button is clicked", () => {
    const onClose = vi.fn();

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });

  test("should call onConfirm when Confirmar button is clicked", () => {
    const onConfirm = vi.fn();

    fireEvent.click(screen.getByText("Confirmar"));
    expect(onConfirm).toHaveBeenCalled();
  });
});
