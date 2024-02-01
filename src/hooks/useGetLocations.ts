import { useQuery } from "@tanstack/react-query";

import { getAllData } from "../api";
import { useAuth } from "../contexts/AuthContext";

import type { Location } from "../stores/types";

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

export const transformLocationData = (data: LocationResponse) => {
  const states = {} as Location;
  const cities = {} as Record<number, Location>;
  const townships = {} as Record<number, Location>;

  data.states.forEach((state) => {
    states[state.id] = state.name;
    cities[state.id] = {};

    state.cities.forEach((city) => {
      cities[state.id][city.id] = city.name;
      townships[city.id] = {};

      city.townships.forEach((tsp) => {
        townships[city.id][tsp.id] = tsp.name;
      });
    });
  });

  return { cities: cities, states: states, townships: townships };
};

export default useGetLocations;
