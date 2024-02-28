import { StateCreator } from "zustand";

import type { PermissionsSlice, StoreState } from "./types";

const usePermissionsStore: StateCreator<StoreState, [], [], PermissionsSlice> =
  (set) => ({
    permissions: {
      audit: [],
      branches: [],
      dashboard: [],
      locations: [],
      roles: [],
      resources: [],
      schedules: [],
      staff: [],
      students: [],
    },
    updatePermissions: (permissions) => set({ permissions: permissions }),
  });

export default usePermissionsStore;
