import { HttpResponse, http } from "msw";

import { AUTH_RESPONSE } from "../config";

export const handlers = [
  http.post(/login/, () => {
    return HttpResponse.json(
      {
        access_token: "eyABC.DEF.GHI",
        name: "user",
        permissions: [
          {
            resource: "dashboard",
            actions: ["GET"],
          },
          {
            resource: "branches",
            actions: [],
          },
        ],
      },
      { status: 200 }
    );
  }),
];

export const errorHandlers = [
  http.post(/login/, () => {
    return HttpResponse.json({ detail: AUTH_RESPONSE.ERROR }, { status: 401 });
  }),
];
