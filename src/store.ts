import { create } from "zustand";

import type { LocationData, ProfileResponse } from "./types";

interface State {
  userInfo: ProfileResponse;
  locations: LocationData;
}

interface Action {
  updateUserInfo: (data: ProfileResponse) => void;
  updateLocations: (data: LocationData) => void;
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
  updateLocations: (data: LocationData) =>
    set(() => ({
      locations: {
        states: data.states,
        cities: data.cities,
        townships: data.townships,
      },
    })),
}));

export { useProfileStore };
