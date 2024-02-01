import { Actions, Resources } from "../hooks/useGetPermissions";

export interface ProfileSlice {
  createdAt: string;
  email: string;
  id: number;
  role: string;
  name: string;
  updateCreatedAt: (createdAt: string) => void;
  updateEmail: (email: string) => void;
  updateID: (id: number) => void;
  updateName: (name: string) => void;
  updateRole: (role: string) => void;
}

export type Location = Record<number, string>;

export interface LocationSlice {
  states: Location;
  cities: Record<number, Location>;
  townships: Record<number, Location>;
  updateStates: (states: Location) => void;
  updateCities: (cities: Record<number, Location>) => void;
  updateTownships: (townships: Record<number, Location>) => void;
}

export type Permissions = Record<Resources, Actions[]>;

export interface PermissionsSlice {
  permissions: Permissions;
  updatePermissions: (permissions: Permissions) => void;
}

export type StoreState = ProfileSlice & LocationSlice & PermissionsSlice;
