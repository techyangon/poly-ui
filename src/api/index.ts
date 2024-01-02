import { API_URL } from "../config";

import type { ErrorResponse, LoginResponse } from "../types";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return (await response.json()) as T;
  } else if (response.status === 502) {
    throw new Error("Server unavilable");
  } else {
    const errorResponse = (await response.json()) as ErrorResponse;
    throw new Error(errorResponse.detail);
  }
};

const postLoginData = async (loginData: FormData): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    body: loginData,
    headers: { Accept: "application/json" },
    method: "POST",
  });

  return await handleResponse<LoginResponse>(response);
};

const getAccessToken = async (username: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/token`, {
    headers: { Accept: "application/json", "X-Username": username },
    method: "GET",
  });

  return await handleResponse<LoginResponse>(response);
};

const getAllData = async <T>(
  accessToken: string,
  limit: number,
  resource: string,
  skip: number,
  username: string
): Promise<T> => {
  const response = await fetch(
    `${API_URL}/${resource}/?skip=${skip}&limit=${limit}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Username": username,
      },
      method: "GET",
    }
  );
  return await handleResponse<T>(response);
};

export { getAccessToken, getAllData, postLoginData };
