import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { userEvent } from "@testing-library/user-event";

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

    const profileButton = screen.getByLabelText("profile");
    await user.click(profileButton);

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

    await screen.findByLabelText("Dashboard");
    await waitFor(() =>
      expect(screen.queryByLabelText("Branches")).not.toBeInTheDocument()
    );
  });
});
