import { Outlet, RouterProvider, createMemoryRouter } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AUTH_CHECK, AUTH_RESPONSE } from "../../config";
import { AuthProvider } from "../../contexts/AuthContext";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

import Login from "./Login";

import { queryClient, screen } from "test-utils";

describe("Login form", () => {
  it("shows errors when values are empty", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    const user = userEvent.setup();

    const loginBtn = screen.getByRole("button", { name: "Login" });
    await user.click(loginBtn);

    await screen.findByText(AUTH_CHECK.EMAIL.EMPTY);
    await screen.findByText(AUTH_CHECK.PASSWORD.LENGTH);
  });

  it("shows error when email is invalid", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    const user = userEvent.setup();

    const email = screen.getByLabelText("Email");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(email, "test");
    await user.click(loginBtn);

    await screen.findByText(AUTH_CHECK.EMAIL.INVALID);
  });

  it("shows error when password is shorter than specified", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    const user = userEvent.setup();

    const password = screen.getByLabelText("Password");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(password, "pass");
    await user.click(loginBtn);

    await screen.findByText(AUTH_CHECK.PASSWORD.LENGTH);
  });

  it("shows error when username or password is incorrect", async () => {
    server.use(...errorHandlers);

    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    const user = userEvent.setup();

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(email, "test@mail.com");
    await user.type(password, "password");
    await user.click(loginBtn);

    await screen.findByText(AUTH_RESPONSE.ERROR);
  });

  it("redirects to dashboard after success login", async () => {
    const routes = [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: (
          <div>
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "profile",
            element: <div>Profile</div>,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, { initialEntries: ["/login"] });
    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    );

    const user = userEvent.setup();

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(email, "user@mail.com");
    await user.type(password, "password");
    await user.click(loginBtn);

    await screen.findByText("Profile");
  });
});
