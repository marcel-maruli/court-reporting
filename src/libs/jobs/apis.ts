import https from "../https";
import {
  AudioTranscription,
  AudioTranscriptionPayload,
  AudioTranscriptionResponse,
  Job,
  JobCreatePayload,
  JobCreateResponse,
  JobResponse,
  UpdateStatusJobPayload,
} from "./models";

export const getJobs = async (): Promise<JobResponse> => {
  try {
    const response = await https.get("/api/jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const createJob = async (
  jobData: JobCreatePayload,
): Promise<JobCreateResponse> => {
  try {
    const response = await https.post("/api/jobs", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const getAudioTranscription = async (
  payload: AudioTranscriptionPayload,
): Promise<AudioTranscription> => {
  try {
    const response = await https.post("/upload-audio", payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error transcrip audio:", error);
    throw error;
  }
};


export const updateJobStatus = async ({jobId,recordingText,status}: UpdateStatusJobPayload): Promise<Job> => {
try {
   const response = await https.patch(`/api/jobs/${jobId}/status`, {status, recordingText});
    return response.data;
  
} catch (error) {
   console.error("Error transcrip audio:", error);
    throw error;
}
} 