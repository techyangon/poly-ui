import { useQuery } from "@tanstack/react-query";

import { handleResponse } from "../api";
import { API_URL } from "../config";
import { useAuth } from "../contexts/AuthContext";

export interface AccessTokenResponse {
  access_token: string;
  name: string;
  toke_type: string;
  expires_in: number;
}

const getAccessToken = async (
  username: string
): Promise<AccessTokenResponse> => {
  const response = await fetch(`${API_URL}/token`, {
    headers: { Accept: "application/json", "X-Username": username },
    method: "GET",
  });

  return await handleResponse<AccessTokenResponse>(response);
};

function useGetAccessToken() {
  const { accessToken, username } = useAuth();

  return useQuery<AccessTokenResponse, Error>({
    queryKey: ["accessToken", username],
    queryFn: async () => getAccessToken(username),
    enabled: accessToken !== "",
  });
}

export default useGetAccessToken;
