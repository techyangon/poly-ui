import { useQuery } from "@tanstack/react-query";

import { getAllData } from "../api";
import { useAuth } from "../contexts/AuthContext";

import type { Permissions } from "../stores/types";

export enum Actions {
  DELETE = "DELETE",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export enum Resources {
  AUDIT = "audit",
  BRANCHES = "branches",
  DASHBOARD = "dashboard",
  LOCATIONS = "locations",
  RESOURCES = "resources",
  ROLES = "roles",
  SCHEDULES = "schedules",
  STAFF = "staff",
  STUDENTS = "students",
}

export interface Permission {
  resource: Resources;
  actions: Actions[];
}

export interface PermissionResponse {
  role: string;
  permissions: Permission[];
}

export const transformPermissionData = (data: PermissionResponse) => {
  return data.permissions.reduce((aggr, current) => {
    aggr[current.resource] = current.actions;
    return aggr;
  }, {} as Permissions);
};

function useGetPermissions() {
  const { accessToken, username } = useAuth();

  return useQuery<PermissionResponse, Error>({
    queryKey: ["permissions", accessToken, username],
    queryFn: async () =>
      await getAllData(accessToken, "permissions", 0, 10, username),
  });
}

export default useGetPermissions;
