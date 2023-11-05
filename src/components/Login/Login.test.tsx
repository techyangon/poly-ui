import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import Login from "./Login";

import { render, screen } from "test-utils";

describe("Login form", () => {
  it("shows errors when values are empty", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const loginBtn = screen.getByRole("button", { name: "Login" });
    await user.click(loginBtn);

    await screen.findByText(/Email cannot be empty/);
    await screen.findByText(/Password must be at least 8 characters/);
  });

  it("shows error when password is shorter than specified", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const password = screen.getByLabelText("Password");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(password, "test");
    await user.click(loginBtn);

    await screen.findByText(/Password must be at least 8 characters/);
  });
});
