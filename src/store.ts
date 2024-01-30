import { create } from "zustand";

import type { ProfileResponse } from "./types";

interface State {
  userInfo: ProfileResponse;
}

interface Action {
  updateUserInfo: (data: ProfileResponse) => void;
}

const useProfileStore = create<State & Action>((set) => ({
  userInfo: {
    created_at: "",
    email: "",
    id: 0,
    name: "",
    role: "",
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
}));

export { useProfileStore };
