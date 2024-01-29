export interface ErrorResponse {
  detail: string;
}

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

export interface LoginResponse {
  access_token: string;
  name: string;
  token_type: string;
  expires_in: number;
  permissions: Permission[];
  role: string;
}

export interface ProfileResponse {
  created_at: string;
  email: string;
  id: number;
  name: string;
  role: string;
}
