import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, test } from "vitest";
import Video from "../components/Video";

describe("Video", () => {
  const mockProps = {
    id: 1,
    title: "Sample Video",
    description: "This is a sample video description.",
    classification: "General",
    user: "John Doe",
    userInfo: { email: "john@example.com" },
    userImage: "https://via.placeholder.com/30",
    data: "https://sample-videos.com/video123.mp4",
    userRole: "admin",
    onDelete: vi.fn(),
    date: "2024-08-13",
    email: "john@example.com",
  };

  test("renders video component with correct props", () => {
    render(<Video {...mockProps} />);
    expect(screen.getByText("Sample Video")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample video description.")
    ).toBeInTheDocument();
    expect(screen.getByText("Clasificación: General")).toBeInTheDocument();
    expect(screen.getByText("Fecha de subida: 2024-08-13")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("toggles description visibility", () => {
    render(<Video {...mockProps} />);
    const toggleButton = screen.getByText("Ver más");
    fireEvent.click(toggleButton);
    expect(screen.getByText("Ver menos")).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getByText("Ver más")).toBeInTheDocument();
  });

  it("calls onDelete function when delete button is clicked", () => {
    render(<Video {...mockProps} />);
    const deleteButton = screen.getByText("Borrar");
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalled();
  });

  it("opens video in new tab when download button is clicked", () => {
    render(<Video {...mockProps} />);
    const downloadButton = screen.getByText("Descargar");
    fireEvent.click(downloadButton);
    expect(window.open).toHaveBeenCalledWith(mockProps.data, "_blank");
  });

  it("renders edit and delete buttons for admin role", () => {
    render(<Video {...mockProps} />);
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Borrar")).toBeInTheDocument();
  });

  it("does not render edit and delete buttons for non-admin/editor role", () => {
    const nonAdminProps = { ...mockProps, userRole: "viewer" };
    render(<Video {...nonAdminProps} />);
    expect(screen.queryByText("Editar")).not.toBeInTheDocument();
    expect(screen.queryByText("Borrar")).not.toBeInTheDocument();
  });
});
