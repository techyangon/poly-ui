import { userEvent } from "@testing-library/user-event";

import { PASSWORD_CHECK, PROFILE_RESPONSE } from "../../config";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

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

  it("shows error when new password violates validation rules", async () => {
    render(<Profile />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Security" }));

    const newPasswordField = screen.getByLabelText("New Password");
    const updatePasswordBtn = screen.getByRole("button", { name: "Save" });

    await user.type(newPasswordField, " ");
    await user.click(updatePasswordBtn);
    await screen.findByText(PASSWORD_CHECK.UPPER);

    await user.clear(newPasswordField);

    await user.type(newPasswordField, "A");
    await user.click(updatePasswordBtn);
    await screen.findByText(PASSWORD_CHECK.LOWER);

    await user.clear(newPasswordField);

    await user.type(newPasswordField, "Ab");
    await user.click(updatePasswordBtn);
    await screen.findByText(PASSWORD_CHECK.DIGIT);

    await user.clear(newPasswordField);

    await user.type(newPasswordField, "Ab7");
    await user.click(updatePasswordBtn);
    await screen.findByText(PASSWORD_CHECK.SPECIAL);

    await user.clear(newPasswordField);

    await user.type(newPasswordField, "Ab#7");
    await user.click(updatePasswordBtn);
    await screen.findByText(PASSWORD_CHECK.LENGTH);

    await user.clear(newPasswordField);

    await user.type(newPasswordField, "Abc#ef7H");
    await user.click(updatePasswordBtn);
    await screen.findByText(PASSWORD_CHECK.MATCH);
  });

  it("toggles password visibility", async () => {
    render(<Profile />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Security" }));

    const newPasswordField = screen.getByLabelText("New Password");

    /* This test is brittle. Maybe visual testing should be prefered */
    const visibilityBtn = screen.queryAllByRole("button")[7];

    expect((newPasswordField as HTMLInputElement).type).toEqual("password");
    await user.click(visibilityBtn);
    await waitFor(() =>
      expect((newPasswordField as HTMLInputElement).type).toEqual("text")
    );
  });

  it("shows error when current password is incorrect", async () => {
    server.use(...errorHandlers);

    render(<Profile />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Security" }));

    await user.type(screen.getByLabelText("Current Password"), "Abcd");
    await user.type(screen.getByLabelText("New Password"), "Abc#ef7I");
    await user.type(screen.getByLabelText("Confirm Password"), "Abc#ef7I");
    await user.click(screen.getByRole("button", { name: "Save" }));

    await screen.findByText(PROFILE_RESPONSE.ERROR);
  });

  it("shows success message when password is updated", async () => {
    render(<Profile />);

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Security" }));

    await user.type(screen.getByLabelText("Current Password"), "Abc#ef7H");
    await user.type(screen.getByLabelText("New Password"), "Abc#ef7I");
    await user.type(screen.getByLabelText("Confirm Password"), "Abc#ef7I");
    await user.click(screen.getByRole("button", { name: "Save" }));

    await screen.findByText("Your password is updated.");
  });
});
