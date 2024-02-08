import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { userEvent } from "@testing-library/user-event";

import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

import BaseLayout from "./BaseLayout";

import { render, screen, waitFor } from "test-utils";

const routes = [
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
  initialEntries: ["/home/profile"],
});

describe("Homepage", () => {
  it("shows username at dropdown", async () => {
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("profile"));

    await screen.findByText("user");
  });

  it("shows navigations per user permissions", async () => {
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await screen.findByText("Profile");

    await user.click(screen.getByRole("button", { name: "open navigation" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Dashboard" })
      ).not.toBeInTheDocument()
    );
  });

  it("toggles theme", async () => {
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const profileButton = screen.getByLabelText("profile");
    await user.click(profileButton);

    const toggleBtn = await screen.findByText("Dark mode");
    await user.click(toggleBtn);

    await screen.findByText("Light mode");
  });

  it("redirects to login after logout", async () => {
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
      initialEntries: ["/home/profile"],
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
