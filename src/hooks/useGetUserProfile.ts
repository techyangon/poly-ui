import { useQuery } from "@tanstack/react-query";

import { getAllData } from "../api";
import { useAuth } from "../contexts/AuthContext";

export interface ProfileResponse {
  created_at: string;
  email: string;
  id: number;
  name: string;
  role: string;
}

function useGetUserProfile() {
  const { accessToken, username } = useAuth();

  return useQuery<ProfileResponse, Error>({
    queryKey: ["profile", accessToken, username],
    queryFn: async () =>
      await getAllData(accessToken, "profile", 0, 10, username),
  });
}

export default useGetUserProfile;
