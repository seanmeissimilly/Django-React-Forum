import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BlogForm from "../components/BlogForm";
import { blogCreate, blogUpdate, blogDetails } from "../redux/blogSlice";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

describe("BlogForm Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      blog: {
        error: null,
        loading: false,
        blogInfo: {},
        success: false,
      },
      user: {
        userInfo: { token: "sample-token" },
      },
    });

    store.dispatch = mockDispatch;
  });

  it("renders BlogForm component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BlogForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Añadir Publicación")).toBeInTheDocument();
  });

  it("shows loader when loading is true", () => {
    store = mockStore({
      blog: {
        error: null,
        loading: true,
        blogInfo: {},
        success: false,
      },
      user: {
        userInfo: { token: "sample-token" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BlogForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    store = mockStore({
      blog: {
        error: "Failed to fetch blog",
        loading: false,
        blogInfo: {},
        success: false,
      },
      user: {
        userInfo: { token: "sample-token" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BlogForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Failed to fetch blog")).toBeInTheDocument();
  });

  it("dispatches blogCreate action on form submit", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BlogForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "New Blog Title" },
    });
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "New Blog Description" },
    });
    fireEvent.submit(screen.getByText("Enviar"));

    expect(mockDispatch).toHaveBeenCalledWith(
      blogCreate({
        title: "New Blog Title",
        body: "New Blog Description",
        token: "sample-token",
      })
    );
  });

  it("dispatches blogUpdate action on form submit when id is present", () => {
    store = mockStore({
      blog: {
        error: null,
        loading: false,
        blogInfo: { id: 1, title: "Existing Blog", body: "Existing Body" },
        success: false,
      },
      user: {
        userInfo: { token: "sample-token" },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/blog/1"]}>
          <Routes>
            <Route path="/blog/:id" element={<BlogForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Updated Blog Title" },
    });
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Updated Blog Description" },
    });
    fireEvent.submit(screen.getByText("Enviar"));

    expect(mockDispatch).toHaveBeenCalledWith(
      blogUpdate({
        id: "1",
        title: "Updated Blog Title",
        body: "Updated Blog Description",
        token: "sample-token",
      })
    );
  });

  it("dispatches blogDetails action on mount when id is present", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/blog/1"]}>
          <Routes>
            <Route path="/blog/:id" element={<BlogForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      blogDetails({ id: "1", token: "sample-token" })
    );
  });
});
