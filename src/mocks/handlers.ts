import { HttpResponse, http } from "msw";

import { AUTH_RESPONSE } from "../config";

export const handlers = [];

export const errorHandlers = [
  http.post(/login/, () => {
    return HttpResponse.json({ detail: AUTH_RESPONSE.ERROR }, { status: 401 });
  }),
];
