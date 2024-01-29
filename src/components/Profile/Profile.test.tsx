import Profile from "./Profile";

import { render, screen, waitFor } from "test-utils";

describe("Profile", () => {
  it("shows user information", async () => {
    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByLabelText("Username")).toHaveValue("user");
      expect(screen.getByLabelText("Email")).toHaveValue("user@mail.com");
      expect(screen.getByLabelText("Role")).toHaveValue("admin");
      expect(screen.getByLabelText("Joined At")).toHaveValue("2024-01-01");
    });
  });
});
