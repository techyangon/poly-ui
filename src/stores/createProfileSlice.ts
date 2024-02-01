import { StateCreator } from "zustand";

import type { ProfileSlice, StoreState } from "./types";

const createProfileSlice: StateCreator<StoreState, [], [], ProfileSlice> = (
  set
) => ({
  createdAt: "",
  email: "",
  id: 0,
  role: "",
  name: "",
  updateCreatedAt: (createdAt) => set(() => ({ createdAt: createdAt })),
  updateEmail: (email) => set(() => ({ email: email })),
  updateID: (id) => set(() => ({ id: id })),
  updateName: (name) => set(() => ({ name: name })),
  updateRole: (role) => set(() => ({ role: role })),
});

export default createProfileSlice;
