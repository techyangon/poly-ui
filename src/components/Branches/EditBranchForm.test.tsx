import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { within } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";

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

describe("Edit branch form", () => {
  it("shows data with save button", async () => {
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const row1Btn = await screen.findByRole("button", {
      name: "view Branch1 data",
    });
    await user.click(row1Btn);

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Branch1");
      expect(screen.getByLabelText("Address")).toHaveValue("Address1");
      expect(screen.getByLabelText("State")).toHaveTextContent("State1");
      expect(screen.getByLabelText("City")).toHaveTextContent("City1");
      expect(screen.getByLabelText("Township")).toHaveTextContent("Tsp1");
      expect(screen.getByLabelText("Created By")).toHaveValue("user");
      expect(screen.getByLabelText("Updated By")).toHaveValue("user");
      expect(screen.getByLabelText("Created At")).toHaveValue("01/01/2024");
      expect(screen.getByLabelText("Updated At")).toHaveValue("01/01/2024");
      expect(
        screen.queryByRole("button", { name: "Save" })
      ).toBeInTheDocument();
    });
  });

  it("changes options based on other fields", async () => {
    const { baseElement } = render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const stateInput = await screen.findByLabelText("State");
    const cityInput = await screen.findByLabelText("City");
    const tspInput = await screen.findByLabelText("Township");

    await user.click(stateInput);
    await waitFor(() => {
      expect(
        within(baseElement).getByRole("option", { name: "State2" })
      ).toBeInTheDocument();
    });
    await user.click(
      within(baseElement).getByRole("option", { name: "State2" })
    );
    await waitFor(() => {
      expect(cityInput).toHaveTextContent("Choose a city");
    });
    await waitFor(() => {
      expect(tspInput).toHaveTextContent("Choose a township");
    });

    await user.click(cityInput);
    await waitFor(() => {
      expect(
        within(baseElement).getByRole("option", { name: "City2" })
      ).toBeInTheDocument();
    });
    await user.click(
      within(baseElement).getByRole("option", { name: "City2" })
    );
    await waitFor(() => {
      expect(tspInput).toHaveTextContent("Choose a township");
    });
  });

  it("resets to original values", async () => {
    const { baseElement } = render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const stateInput = await screen.findByLabelText("State");
    const cityInput = await screen.findByLabelText("City");
    const tspInput = await screen.findByLabelText("Township");

    await user.click(stateInput);
    await waitFor(() => {
      expect(
        within(baseElement).getByRole("option", { name: "State2" })
      ).toBeInTheDocument();
    });
    await user.click(
      within(baseElement).getByRole("option", { name: "State2" })
    );

    await user.click(screen.getByRole("button", { name: "Reset" }));

    await waitFor(() => {
      expect(stateInput).toHaveTextContent("State1");
      expect(cityInput).toHaveTextContent("City1");
      expect(tspInput).toHaveTextContent("Tsp1");
    });
  });

  it("redirects to branches page", async () => {
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Back" }));

    await screen.findByRole("button", { name: "New Branch" });
  });
});
