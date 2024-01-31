import { create } from "zustand";

import type { LocationResponse } from "./hooks/useGetLocations";
import type { ProfileResponse } from "./types";

export type Location = Record<number, string>;

export interface LocationData {
  states: Location;
  cities: Record<number, Location>;
  townships: Record<number, Location>;
}

interface State {
  userInfo: ProfileResponse;
  locations: LocationData;
}

interface Action {
  updateUserInfo: (data: ProfileResponse) => void;
  updateLocations: (data: LocationResponse) => void;
}

const useProfileStore = create<State & Action>((set) => ({
  userInfo: {
    created_at: "",
    email: "",
    id: 0,
    name: "",
    role: "",
  },
  locations: {
    states: {},
    cities: {},
    townships: {},
  },
  updateUserInfo: (data: ProfileResponse) =>
    set(() => ({
      userInfo: {
        created_at: data.created_at,
        email: data.email,
        id: data.id,
        name: data.name,
        role: data.role,
      },
    })),
  updateLocations: (data: LocationResponse) =>
    set(() => {
      const states = {} as Location;
      const cities = {} as Record<number, Location>;
      const townships = {} as Record<number, Location>;

      data.states.forEach((state) => {
        states[state.id] = state.name;
        cities[state.id] = {};

        state.cities.forEach((city) => {
          cities[state.id][city.id] = city.name;
          townships[city.id] = {};

          city.townships.forEach((tsp) => {
            townships[city.id][tsp.id] = tsp.name;
          });
        });
      });

      return {
        locations: {
          cities: cities,
          states: states,
          townships: townships,
        },
      };
    }),
}));

export { useProfileStore };
