import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { userEvent } from "@testing-library/user-event";

import { permissionHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import BaseLayout from "../BaseLayout/BaseLayout";

import BranchDetails from "./BranchDetails";
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
        element: <BranchDetails />,
      },
    ],
  },
];
const router = createMemoryRouter(routes, {
  initialEntries: ["/home/branches", "/home/branches/1"],
  initialIndex: 0,
});

describe("View branch form", () => {
  it("shows data without save button", async () => {
    server.use(...permissionHandlers);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const row1Btn = await screen.findByRole("button", {
      name: "view Branch1 data",
    });
    await user.click(row1Btn);

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Branch1");
      expect(screen.getByLabelText("Address")).toHaveValue("Address1");
      expect(screen.getByLabelText("State")).toHaveValue("State1");
      expect(screen.getByLabelText("City")).toHaveValue("City1");
      expect(screen.getByLabelText("Township")).toHaveValue("Tsp1");
      expect(screen.getByLabelText("Created By")).toHaveValue("user");
      expect(screen.getByLabelText("Updated By")).toHaveValue("user");
      expect(screen.getByLabelText("Created At")).toHaveValue("01/01/2024");
      expect(screen.getByLabelText("Updated At")).toHaveValue("01/01/2024");
      expect(
        screen.queryByRole("button", { name: "Save" })
      ).not.toBeInTheDocument();
    });
  });
});
