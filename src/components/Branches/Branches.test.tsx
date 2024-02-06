import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import BaseLayout from "../BaseLayout/BaseLayout";

import Branches from "./Branches";

import { render, screen, waitFor } from "test-utils";

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

describe("Branches", () => {
  it("shows button to creat new branch with permissions", async () => {
    render(<RouterProvider router={router} />);

    await screen.findByRole("button", { name: "New Branch" });
  });

  it("doesn't show button to creat new branch without permissions", async () => {
    server.use(...errorHandlers);
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: "New Branch" })
      ).not.toBeInTheDocument();
    });
  });

  it("renders table data correctly", async () => {
    render(<RouterProvider router={router} />);

    /* 1 Header row + 2 Data row */
    await waitFor(() => {
      expect(screen.queryAllByRole("row").length).toEqual(3);

      expect(screen.getByText("Branch1")).toBeInTheDocument();
      expect(screen.getByText("Branch2")).toBeInTheDocument();
    });
  });
});
