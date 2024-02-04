import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { within } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";

import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import BaseLayout from "../BaseLayout/BaseLayout";

import Branches from "./Branches";

import { render, screen, waitFor } from "test-utils";

describe("Branches", () => {
  it("shows button to creat new branch with permissions", async () => {
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "branches",
            element: <Branches />,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home/branches"],
    });

    render(<RouterProvider router={router} />);

    await screen.findByRole("button", { name: "New Branch" });
  });

  it("shows no button to creat new branch without permissions", async () => {
    server.use(...errorHandlers);

    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "branches",
            element: <Branches />,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home/branches"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: "New Branch" })
      ).not.toBeInTheDocument();
    });
  });

  it("renders table data correctly", async () => {
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "branches",
            element: <Branches />,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home/branches"],
    });

    render(<RouterProvider router={router} />);

    /* 1 Header row + 2 Data row */
    await waitFor(() => {
      expect(screen.queryAllByRole("row").length).toEqual(3);

      expect(screen.getByText("Branch1")).toBeInTheDocument();
      expect(screen.getByText("Branch2")).toBeInTheDocument();
    });
  });

  it("informs the user when there is no data", async () => {
    server.use(...errorHandlers);
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "branches",
            element: <Branches />,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home/branches"],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText("There are no existing branches.");
  });

  it("shows the form for row details", async () => {
    const routes = [
      {
        path: "/home",
        element: <BaseLayout />,
        children: [
          {
            path: "branches",
            element: <Branches />,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home/branches"],
    });
    const { baseElement } = render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const row1Btn = await screen.findByLabelText("view Branch1 data");
    await user.click(row1Btn);

    const drawer = within(baseElement).getByTestId("row-data");

    expect(within(drawer).getByLabelText("Name")).toHaveValue("Branch1");
    expect(within(drawer).getByLabelText("Address")).toHaveValue("Address1");
    expect(within(drawer).getByLabelText("Township")).toHaveValue("Tsp1");
    expect(within(drawer).getByLabelText("City")).toHaveValue("City1");
    expect(within(drawer).getByLabelText("State")).toHaveValue("State1");
    expect(within(drawer).getByLabelText("Created By")).toHaveValue("user");
    expect(within(drawer).getByLabelText("Updated At")).toHaveValue(
      "01/01/2024"
    );

    await user.click(screen.getByLabelText("close drawer"));

    await waitFor(() => {
      expect(
        within(baseElement).queryByTestId("row-data")
      ).not.toBeInTheDocument();
    });
  });
});
