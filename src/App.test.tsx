import "@testing-library/jest-dom/vitest";

import App from "./App";

import { render, screen } from "test-utils";

describe("App", () => {
  it("shows login form when unauthenticated", async () => {
    render(<App />);
    await screen.findByLabelText("email");
    await screen.findByLabelText("password");
  });
});
