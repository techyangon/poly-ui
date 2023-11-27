import { API_URL } from "../config";

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ErrorResponse {
  detail: string;
}

const headers = new Headers({
  Accept: "application/json",
});

const postLoginData = async (loginData: FormData): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    body: loginData,
    headers: headers,
    method: "POST",
  });
  if (response.ok) {
    return (await response.json()) as LoginResponse;
  } else if (response.status === 502) {
    throw new Error("Server unavilable");
  } else {
    const errorResponse = (await response.json()) as ErrorResponse;
    throw new Error(errorResponse.detail);
  }
};

export { postLoginData };
