import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AboutUs from "../components/AboutUs";
import { userList } from "../redux/userSlice";

const mockStore = configureStore([]);
const mockDispatch = vi.fn();

describe("AboutUs Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        error: null,
        loading: false,
        users: [
          {
            id: 1,
            user_name: "Admin User",
            email: "admin@example.com",
            image: "/images/admin.jpg",
            role: "admin",
          },
        ],
        userInfo: { token: "sample-token" },
      },
    });

    store.dispatch = mockDispatch;
  });

  it("renders AboutUs component with admin user", () => {
    render(
      <Provider store={store}>
        <AboutUs />
      </Provider>
    );

    expect(screen.getByText("Contacto del Administrador:")).toBeInTheDocument();
    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("admin@example.com")).toBeInTheDocument();
  });

  it("shows loader when loading is true", () => {
    store = mockStore({
      user: {
        error: null,
        loading: true,
        users: [],
        userInfo: { token: "sample-token" },
      },
    });

    render(
      <Provider store={store}>
        <AboutUs />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error message when there is an error", () => {
    store = mockStore({
      user: {
        error: "Failed to fetch users",
        loading: false,
        users: [],
        userInfo: { token: "sample-token" },
      },
    });

    render(
      <Provider store={store}>
        <AboutUs />
      </Provider>
    );

    expect(screen.getByText("Failed to fetch users")).toBeInTheDocument();
  });

  it("opens and closes the drawer", () => {
    render(
      <Provider store={store}>
        <AboutUs />
      </Provider>
    );

    const openButton = screen.getByText("Desarrollador");
    fireEvent.click(openButton);
    expect(screen.getByText("Desarrollado por:")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText("Desarrollado por:")).not.toBeInTheDocument();
  });

  it("dispatches userList action on mount", () => {
    render(
      <Provider store={store}>
        <AboutUs />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(
      userList({ token: "sample-token" })
    );
  });
});
