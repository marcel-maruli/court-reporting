import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUserResponse, UpdateAssignmentPayload } from "./models";
import { getUsers, updateAssignment } from "./apis";

export const useQueryGetUsers = () =>
  useQuery<GetUserResponse>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

export const useMutationUpdateReporter = () =>
  useMutation<GetUserResponse, Error, UpdateAssignmentPayload>({
    mutationKey: ["job-assignment"],
    mutationFn: async (payload) => updateAssignment(payload),
  });
