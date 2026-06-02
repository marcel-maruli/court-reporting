import https from "../https";
import { GetUserResponse, UpdateAssignmentPayload } from "./models";

export const getUsers = async () => {
  const response = await https.get("/api/users");
  return response.data;
};

export const updateAssignment = async ({
  role,
  editorId,
  jobId,
  reporterId,
}: UpdateAssignmentPayload): Promise<GetUserResponse> => {
  try {
    const newRoute = role === "EDITOR" ? "assign-editor" : "assign-reporter";
    const payload = {
      [role === "EDITOR" ? "editorId" : "reporterId"]:
        role === "EDITOR" ? editorId : reporterId,
    };
    const response = await https.post(
      `/api/jobs/${jobId}/${newRoute}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
