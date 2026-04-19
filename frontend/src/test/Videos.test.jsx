import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Videos from "../components/Videos";
import {
  multimediaList,
  multimediaDelete,
  multimediaclassificationList,
} from "../redux/multimediaSlice";
import { userList } from "../redux/userSlice";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

describe("Videos Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      multimedia: {
        multimedias: [
          {
            id: 1,
            title: "Sample Video",
            description: "This is a sample video description.",
            multimediaclassification: 1,
            user: "John Doe",
            data: "https://sample-videos.com/video123.mp4",
            date: "2024-08-13",
          },
        ],
        multimediaclassification: [{ id: 1, description: "General" }],
        multimediaInfo: {},
        error: null,
        loading: false,
      },
      user: {
        users: [
          {
            id: 1,
            user_name: "John Doe",
            email: "john@example.com",
            image: "/images/john.jpg",
          },
        ],
        userInfo: { token: "sample-token", role: "admin" },
      },
    });

    store.dispatch = mockDispatch;
  });

  it("renders Videos component with video list", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Videos />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Sample Video")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample video description.")
    ).toBeInTheDocument();
  });

  it("shows loader when loading is true", () => {
    store = mockStore({
      multimedia: {
        multimedias: [],
        multimediaclassification: [],
        multimediaInfo: {},
        error: null,
        loading: true,
      },
      user: {
        users: [],
        userInfo: { token: "sample-token", role: "admin" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Videos />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    store = mockStore({
      multimedia: {
        multimedias: [],
        multimediaclassification: [],
        multimediaInfo: {},
        error: "Failed to fetch videos",
        loading: false,
      },
      user: {
        users: [],
        userInfo: { token: "sample-token", role: "admin" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Videos />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Failed to fetch videos")).toBeInTheDocument();
  });

  it("dispatches multimediaList and multimediaclassificationList actions on mount", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Videos />
        </MemoryRouter>
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      multimediaList({ token: "sample-token" })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      multimediaclassificationList({ token: "sample-token" })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      userList({ token: "sample-token" })
    );
  });

  it("opens and closes the delete confirmation modal", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Videos />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Borrar"));
    expect(
      screen.getByText("¿Estás seguro de que deseas borrar este video?")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancelar"));
    expect(
      screen.queryByText("¿Estás seguro de que deseas borrar este video?")
    ).not.toBeInTheDocument();
  });

  it("dispatches multimediaDelete action when delete is confirmed", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Videos />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Borrar"));
    fireEvent.click(screen.getByText("Confirmar"));

    expect(mockDispatch).toHaveBeenCalledWith(
      multimediaDelete({ id: 1, token: "sample-token" })
    );
  });
});
