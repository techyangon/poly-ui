import { userEvent } from "@testing-library/user-event";

import Dashboard from "./Dashboard";

import { render, screen } from "test-utils";

describe("Dashboard", () => {
  it("shows username at dropdown", async () => {
    render(<Dashboard />);
    const user = userEvent.setup();

    const profileButton = screen.getByLabelText("profile");
    await user.click(profileButton);

    await screen.findByText("user");
  });
});
