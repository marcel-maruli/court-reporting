import { ApiResponse } from "../apiResponse";

export type JobResponse = ApiResponse<Job[]>;
export type JobCreateResponse = ApiResponse<Job>;

export interface Job {
 id: number;
  case_name: string;
  duration_minutes: number;
  status: string;
  pic: {
    reporter: UserPayment;
    editor: UserPayment;
  };
  city: string;
  location_type: "REMOTE" | "PHYSICAL";
  recording_text: any;
  created_at: string;
}

export interface JobCreatePayload {
  case_name?: string;
  duration_minutes?: number;
  location_type?: "REMOTE" | "PHYSICAL";
  city?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  reporter_id?: number;
  editor_id?: number;
  recording_text?: string;
}


interface UserPayment {
  id: number | null;
  name: string | null;
  payout: string | number;
  payout_status: string | null;
}
