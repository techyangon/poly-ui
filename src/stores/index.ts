import { create } from "zustand";

import createLocationSlice from "./createLocationSlice";
import createPermissionsSlice from "./createPermissionsSlice";
import createProfileSlice from "./createProfileSlice";

import type { StoreState } from "./types";

const useBoundStore = create<StoreState>()((...a) => ({
  ...createLocationSlice(...a),
  ...createPermissionsSlice(...a),
  ...createProfileSlice(...a),
}));

export default useBoundStore;
