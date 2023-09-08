import '@testing-library/jest-dom/vitest';
import { render, screen } from "test-utils";

import App from "./App";

describe("App", () => {
  it("shows Poly nam", () => {
    render(<App />);
    expect(screen.getByText("Poly")).toBeInTheDocument();
  });
});
