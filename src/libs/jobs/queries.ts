import { useMutation, useQuery } from "@tanstack/react-query";
import { JobCreatePayload, JobCreateResponse, JobResponse } from "./models";
import { createJob, getJobs } from "./apis";

export const useQueryGetJobs = () =>
  useQuery<JobResponse>({
    queryKey: ["jobs"],
    queryFn: async () => getJobs(),
  });

export const useMutationCreateJob = () =>
  useMutation<JobCreateResponse, Error, JobCreatePayload>({
    mutationKey: ["createJob"],
    mutationFn: async (payload) => createJob(payload),
  });
