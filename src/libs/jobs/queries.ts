import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AudioTranscription,
  AudioTranscriptionPayload,
  Job,
  JobCreatePayload,
  JobCreateResponse,
  JobResponse,
  UpdateStatusJobPayload,
} from "./models";
import { createJob, getAudioTranscription, getJobs, updateJobStatus } from "./apis";

export const useQueryGetJobs = () =>
  useQuery<JobResponse>({
    queryKey: ["jobs"],
    queryFn: async () => getJobs(),
  });

export const useMutationCreateJob = () =>
  useMutation<JobCreateResponse, Error, JobCreatePayload>({
    mutationKey: ["create-job"],
    mutationFn: async (payload) => createJob(payload),
  });

export const useMutationAudioTranscription = () =>
  useMutation<AudioTranscription, Error, AudioTranscriptionPayload>({
    mutationKey: ["audio-transcription"],
    mutationFn: async (payload) => getAudioTranscription(payload),
  });


export const useMutationUpdateStatus = () => useMutation<Job, Error, UpdateStatusJobPayload>({
  mutationKey: ["update-status"],
  mutationFn: async (payload) => updateJobStatus(payload)
}) 