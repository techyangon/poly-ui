import { useQuery } from "@tanstack/react-query";

import { getAllData } from "../api";
import { useAuth } from "../contexts/AuthContext";

interface Branch {
  address: string;
  city: string;
  created_by: string;
  id: number;
  name: string;
  state: string;
  township: string;
  updated_at: string;
}

interface BranchesResponse {
  branches: Branch[] | never[];
  total: number;
}

interface PaginatedProps {
  id: number;
  per_page: number;
}

function useGetBranches({ id, per_page }: PaginatedProps) {
  const { accessToken, username } = useAuth();

  return useQuery<BranchesResponse, Error>({
    queryKey: ["branches", accessToken, id, per_page, username],
    queryFn: async () =>
      await getAllData(accessToken, "branches", id, per_page, username),
  });
}

export default useGetBranches;
