import { API_URL } from "../config";

export interface SuccessResponse {
  message: string;
}

interface ErrorResponse {
  detail: string;
}

export interface UpdateDataProps<T> {
  accessToken: string;
  resource: string;
  payload: T;
  username: string;
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return (await response.json()) as T;
  } else if (response.status === 502) {
    throw new Error("Server unavilable");
  } else {
    const errorResponse = (await response.json()) as ErrorResponse;
    throw new Error(errorResponse.detail);
  }
};

const getAllData = async <T>(
  accessToken: string,
  resource: string,
  skip: number,
  limit: number,
  username: string
): Promise<T> => {
  const response = await fetch(
    `${API_URL}/${resource}/?id=${skip}&per_page=${limit}`,
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
}: UpdateDataProps<T>): Promise<SuccessResponse> => {
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
  return await handleResponse<SuccessResponse>(response);
};

export { getAllData, updateData };
