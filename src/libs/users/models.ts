import { ApiResponse } from "../apiResponse";

export type GetUserResponse = ApiResponse<User[]>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  role: string;
  city: string;
  is_available: boolean;
  created_at: string;
};

export type UpdateAssignmentPayload = {
  reporterId?: number;
  editorId?: number;
  role: "REPORTER" | "EDITOR",
  jobId?: number
}