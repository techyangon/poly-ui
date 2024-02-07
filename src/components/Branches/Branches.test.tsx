import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { userEvent } from "@testing-library/user-event";

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
      {
        path: "branches/:branchID",
        element: <div>Branch Info</div>,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/home/branches", "/home/branches/1"],
  initialIndex: 0,
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

  it("directs to single branch page", async () => {
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const row1Btn = await screen.findByRole("button", {
      name: "view Branch1 data",
    });

    await user.click(row1Btn);

    await waitFor(() => {
      expect(screen.queryByText("Branch Info")).toBeInTheDocument();
    });
  });
});
