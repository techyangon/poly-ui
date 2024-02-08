import { HttpResponse, http } from "msw";

import { AUTH_RESPONSE, PROFILE_RESPONSE } from "../config";

const handlers = [
  http.get(/branches\/1/, () => {
    return HttpResponse.json(
      {
        id: 1,
        name: "Branch1",
        address: "Address1",
        township: 1,
        city: 1,
        state: 1,
        created_at: "2024-01-01T00:00:00.000000Z",
        created_by: "user",
        updated_at: "2024-01-01T00:00:00.000000Z",
        updated_by: "user",
      },
      { status: 200 }
    );
  }),
  http.get(/branches/, () => {
    return HttpResponse.json(
      {
        branches: [
          {
            id: 1,
            name: "Branch1",
            address: "Address1",
            township: "Tsp1",
            city: "City1",
            state: "State1",
          },
          {
            id: 2,
            name: "Branch2",
            address: "Address2",
            township: "Tsp2",
            city: "City2",
            state: "State2",
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.post(/login/, () => {
    return HttpResponse.json(
      {
        access_token: "eyABC.DEF.GHI",
        name: "user",
      },
      { status: 200 }
    );
  }),
  http.get(/locations/, () => {
    return HttpResponse.json(
      {
        states: [
          {
            id: 1,
            name: "State1",
            cities: [
              { id: 1, name: "City1", townships: [{ id: 1, name: "Tsp1" }] },
            ],
          },
          {
            id: 2,
            name: "State2",
            cities: [
              { id: 2, name: "City2", townships: [{ id: 2, name: "Tsp2" }] },
            ],
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.get(/permissions/, () => {
    return HttpResponse.json(
      {
        role: "admin",
        permissions: [
          {
            resource: "dashboard",
            actions: [],
          },
          {
            resource: "branches",
            actions: ["DELETE", "GET", "POST", "PUT"],
          },
        ],
      },
      { status: 200 }
    );
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

const errorHandlers = [
  http.get(/branches/, () => {
    return HttpResponse.json(
      { detail: "There are no existing branches." },
      { status: 404 }
    );
  }),
  http.post(/login/, () => {
    return HttpResponse.json({ detail: AUTH_RESPONSE.ERROR }, { status: 401 });
  }),
  http.get(/permissions/, () => {
    return HttpResponse.json(
      {
        role: "staff",
        permissions: [
          {
            resource: "branches",
            actions: ["GET"],
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.get(/locations/, () => {
    return HttpResponse.json({ detail: "Expired token" }, { status: 401 });
  }),
  http.get(/profile/, () => {
    return HttpResponse.json({ detail: "Expired token" }, { status: 401 });
  }),
  http.put(/profile/, () => {
    return HttpResponse.json(
      { detail: PROFILE_RESPONSE.ERROR },
      { status: 400 }
    );
  }),
  http.get(/token/, () => {
    return HttpResponse.json({ detail: "Expired token" }, { status: 401 });
  }),
];

const permissionHandlers = handlers.map((item) => item);
permissionHandlers[4] = errorHandlers[2];

export { errorHandlers, handlers, permissionHandlers };
