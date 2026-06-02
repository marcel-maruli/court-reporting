import https from "../https";
import { JobCreatePayload, JobCreateResponse, JobResponse } from "./models";

export const getJobs = async (): Promise<JobResponse> => {
  try {
    const response = await https.get("/api/jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export const createJob = async (jobData: JobCreatePayload): Promise<JobCreateResponse> => {
  try {
    const response = await https.post("/api/jobs", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}   