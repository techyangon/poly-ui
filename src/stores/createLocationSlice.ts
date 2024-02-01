import { StateCreator } from "zustand";

import type { LocationSlice, StoreState } from "./types";

const createLocationSlice: StateCreator<StoreState, [], [], LocationSlice> = (
  set
) => ({
  states: {},
  cities: {},
  townships: {},
  updateCities: /* istanbul ignore next */ (cities) => set({ cities: cities }),
  updateStates: /* istanbul ignore next */ (states) => set({ states: states }),
  updateTownships: /* istanbul ignore next */ (townships) =>
    set({ townships: townships }),
});

export default createLocationSlice;
