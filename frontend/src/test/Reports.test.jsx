import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import documentReducer from "../redux/documentSlice";
import multimediaReducer from "../redux/multimediaSlice";
import appReducer from "../redux/appSlice";
import Reports from "../components/Reports";
import { describe, test, expect, vi } from "vitest";

vi.mock("./Messages.jsx", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("./Loader.jsx", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

vi.mock("./Report.jsx", () => ({
  __esModule: true,
  default: ({ name, columns, data, date }) => (
    <div>
      <h2>{name}</h2>
      <table>
        <thead>
          <tr>
            {columns[0].map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>{date}</p>
    </div>
  ),
}));

const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      document: documentReducer,
      multimedia: multimediaReducer,
      app: appReducer,
    },
    preloadedState: reduxState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Reports Component", () => {
  test("renders loading state", () => {
    renderWithProviders(<Reports />, {
      reduxState: {
        user: { loading: true },
        document: { loading: true },
        multimedia: { loading: true },
        app: { loading: true },
      },
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    renderWithProviders(<Reports />, {
      reduxState: {
        user: { error: "Error loading users" },
        document: { error: "Error loading documents" },
        multimedia: { error: "Error loading videos" },
        app: { error: "Error loading tools" },
      },
    });

    expect(screen.getByText("Error loading users")).toBeInTheDocument();
  });

  test("renders reports", () => {
    renderWithProviders(<Reports />, {
      reduxState: {
        user: {
          users: [
            {
              id: 1,
              user_name: "John Doe",
              email: "john@example.com",
              role: "reader",
              start_date: "2023-01-01",
              last_login: "2023-01-10",
            },
          ],
          userInfo: { token: "test-token" },
        },
        document: {
          documents: [
            {
              id: 1,
              title: "Document 1",
              date: "2023-01-01",
              documenttypes: 1,
              documentclassification: 1,
              user: "John Doe",
            },
          ],
          documenttypes: [{ id: 1, description: "Type 1" }],
          documentclassification: [{ id: 1, description: "Classification 1" }],
        },
        multimedia: {
          multimedias: [
            {
              id: 1,
              title: "Video 1",
              date: "2023-01-01",
              multimediaclassification: 1,
              user: "John Doe",
            },
          ],
          multimediaclassification: [
            { id: 1, description: "Classification 1" },
          ],
        },
        app: {
          apps: [
            {
              id: 1,
              title: "Tool 1",
              date: "2023-01-01",
              applicationclassification: 1,
              user: "John Doe",
            },
          ],
          appclassification: [{ id: 1, description: "Classification 1" }],
        },
      },
    });

    expect(screen.getByText("Listado de Usuarios")).toBeInTheDocument();
    expect(screen.getByText("Listado de Documentos")).toBeInTheDocument();
    expect(screen.getByText("Listado de Videos")).toBeInTheDocument();
    expect(screen.getByText("Listado de Herramientas")).toBeInTheDocument();
  });
});
