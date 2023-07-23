import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import fetch from "cross-fetch";
import { afterAll, afterEach, beforeAll, expect } from "vitest";

import { server } from "./mocks/server";

global.fetch = fetch;

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
