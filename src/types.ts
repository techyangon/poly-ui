interface Base {
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface ErrorResponse {
  detail: string;
}

export interface LoginResponse {
  access_token: string;
  name: string;
  token_type: string;
  expires_in: number;
}

interface Resource extends Base {
  name: string;
}

export interface ResourceResponse {
  resources: Resource[];
  total: number;
}
