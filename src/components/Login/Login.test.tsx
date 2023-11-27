import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import { AUTH_CHECK, AUTH_RESPONSE } from "../../config";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

import Login from "./Login";

import { render, screen } from "test-utils";

describe("Login form", () => {
  it("shows errors when values are empty", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const loginBtn = screen.getByRole("button", { name: "Login" });
    await user.click(loginBtn);

    await screen.findByText(AUTH_CHECK.EMAIL.EMPTY);
    await screen.findByText(AUTH_CHECK.PASSWORD.LENGTH);
  });

  it("shows error when email is invalid", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const email = screen.getByLabelText("Email");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(email, "test");
    await user.click(loginBtn);

    await screen.findByText(AUTH_CHECK.EMAIL.INVALID);
  });

  it("shows error when password is shorter than specified", async () => {
    render(<Login />);
    const user = userEvent.setup();

    const password = screen.getByLabelText("Password");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(password, "pass");
    await user.click(loginBtn);

    await screen.findByText(AUTH_CHECK.PASSWORD.LENGTH);
  });

  it("shows error when password is shorter than specified", async () => {
    server.use(...errorHandlers);

    render(<Login />);
    const user = userEvent.setup();

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const loginBtn = screen.getByRole("button", { name: "Login" });

    await user.type(email, "test@mail.com");
    await user.type(password, "password");
    await user.click(loginBtn);

    await screen.findByText(AUTH_RESPONSE.ERROR);
  });
});
