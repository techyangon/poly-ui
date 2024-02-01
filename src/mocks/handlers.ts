import { HttpResponse, http } from "msw";

import { AUTH_RESPONSE, PROFILE_RESPONSE } from "../config";

export const handlers = [
  http.post(/login/, () => {
    return HttpResponse.json(
      {
        access_token: "eyABC.DEF.GHI",
        name: "user",
      },
      { status: 200 }
    );
  }),
  http.get(/permissions/, () => {
    return HttpResponse.json({
      role: "admin",
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
    });
  }),
  http.get(/profile/, () => {
    return HttpResponse.json(
      {
        created_at: "2024-01-01T00:00:00.000000Z",
        email: "user@mail.com",
        id: 1,
        name: "user",
        role: "admin",
      },
      { status: 200 }
    );
  }),
  http.put(/profile/, () => {
    return HttpResponse.json(
      { message: "User password is updated." },
      { status: 200 }
    );
  }),
  http.get(/token/, () => {
    return HttpResponse.json({
      access_token: "eyABC.DEF.GHI",
      name: "user",
    });
  }),
];

export const errorHandlers = [
  http.post(/login/, () => {
    return HttpResponse.json({ detail: AUTH_RESPONSE.ERROR }, { status: 401 });
  }),
  http.put(/profile/, () => {
    return HttpResponse.json(
      { detail: PROFILE_RESPONSE.ERROR },
      { status: 400 }
    );
  }),
];
