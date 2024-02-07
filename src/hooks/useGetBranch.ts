import { useQuery } from "@tanstack/react-query";

import { getSingleRecord } from "../api";
import { useAuth } from "../contexts/AuthContext";

interface BranchAbbr {
  address: string;
  city: number;
  created_at: string;
  created_by: string;
  id: number;
  name: string;
  state: number;
  township: number;
  updated_at: string;
  updated_by: string;
}

interface SingleRecordProp {
  id: number;
}

function useGetBranch({ id }: SingleRecordProp) {
  const { accessToken, username } = useAuth();

  return useQuery<BranchAbbr, Error>({
    queryKey: ["branch", accessToken, id, username],
    queryFn: async () =>
      await getSingleRecord(accessToken, "branches", id, username),
  });
}

export default useGetBranch;
