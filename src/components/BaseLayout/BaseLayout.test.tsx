import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { userEvent } from "@testing-library/user-event";

import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import Root from "../Root/Root";

import BaseLayout from "./BaseLayout";

import { render, screen, waitFor } from "test-utils";

describe("Homepage", () => {
  it("shows username at dropdown", async () => {
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("profile"));

    await screen.findByText("user");
  });

  it("shows navigations per user permissions", async () => {
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
      },
    ];
    const router = createMemoryRouter(routes, { initialEntries: ["/home"] });
    render(<RouterProvider router={router} />);

    await screen.findByLabelText("Branches");
    await waitFor(() =>
      expect(screen.queryByLabelText("Dashboard")).not.toBeInTheDocument()
    );
  });

  it("toggles theme", async () => {
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const profileButton = screen.getByLabelText("profile");
    await user.click(profileButton);

    const toggleBtn = await screen.findByText("Dark mode");
    await user.click(toggleBtn);

    await screen.findByText("Light mode");
  });

  it("redirects to login after logout", async () => {
    const routes = [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "profile",
            element: <div>Profile</div>,
          },
        ],
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("profile"));

    const logoutBtn = await screen.findByText("Logout");
    await user.click(logoutBtn);

    await screen.findByText("Login");
  });

  it("shows redirect notice after refresh token expiry", async () => {
    server.use(...errorHandlers);
    const routes = [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "profile",
            element: <div>Profile</div>,
          },
        ],
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await screen.findByText(
      "Your session has expired. Redirecting you to login."
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => {
      expect(
        screen.queryByText(
          "Your session has expired. Redirecting you to login."
        )
      ).not.toBeInTheDocument();
    });
  });
});
