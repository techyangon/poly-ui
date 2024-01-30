import { API_URL } from "../config";

import type { ErrorResponse, LoginResponse, SuccessResponse } from "../types";

type UpdateResponse = SuccessResponse | ErrorResponse;

export interface UpdateDataProps<T> {
  accessToken: string;
  resource: string;
  payload: T;
  username: string;
}

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
  resource: string,
  skip: number,
  limit: number,
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

const updateData = async <T>({
  accessToken,
  resource,
  payload,
  username,
}: UpdateDataProps<T>): Promise<UpdateResponse> => {
  const response = await fetch(`${API_URL}/${resource}/`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Username": username,
    },
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return await handleResponse<UpdateResponse>(response);
};

export { getAccessToken, getAllData, postLoginData, updateData };
