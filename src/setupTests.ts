import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import fetch from "cross-fetch";
import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "./mocks/server";

global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
