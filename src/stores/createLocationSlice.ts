import { StateCreator } from "zustand";

import type { LocationSlice, StoreState } from "./types";

const createLocationSlice: StateCreator<StoreState, [], [], LocationSlice> = (
  set
) => ({
  states: {},
  cities: {},
  townships: {},
  updateStates: (states) => set({ states: states }),
  updateCities: (cities) => set({ cities: cities }),
  updateTownships: (townships) => set({ townships: townships }),
});

export default createLocationSlice;
