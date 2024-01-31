import { useQuery } from "@tanstack/react-query";

import { getAllData } from "../api";
import { useAuth } from "../contexts/AuthContext";

interface Township {
  id: number;
  name: string;
}

interface City extends Township {
  townships: Township[];
}

interface State extends Township {
  cities: City[];
}

export interface LocationResponse {
  states: State[];
}

function useGetLocations() {
  const { accessToken, username } = useAuth();
  return useQuery<LocationResponse, Error>({
    queryKey: ["locations", accessToken, username],
    queryFn: async (): Promise<LocationResponse> =>
      await getAllData(accessToken, "locations", 0, 10, username),
    staleTime: Infinity,
  });
}

export default useGetLocations;
