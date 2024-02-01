import { useMutation } from "@tanstack/react-query";

import { updateData } from "../api";

import type { SuccessResponse } from "../api";

interface Payload {
  id: number;
  current_password: string;
  new_password: string;
}

interface UpdatePasswordProps {
  accessToken: string;
  payload: Payload;
  resource: string;
  username: string;
}

function useUpdatePassword() {
  return useMutation<SuccessResponse, Error, UpdatePasswordProps>({
    mutationFn: updateData,
  });
}

export default useUpdatePassword;
