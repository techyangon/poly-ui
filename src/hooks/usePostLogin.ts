import { useMutation } from "@tanstack/react-query";

import { handleResponse } from "../api";
import { API_URL } from "../config";

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  name: string;
  token_type: string;
}

const postLoginData = async (loginData: FormData): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    body: loginData,
    headers: { Accept: "application/json" },
    method: "POST",
  });

  return await handleResponse<LoginResponse>(response);
};

function usePostLogin() {
  return useMutation<LoginResponse, Error, FormData>({
    mutationFn: postLoginData,
  });
}

export default usePostLogin;
