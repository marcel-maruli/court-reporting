export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errors?: Errors[];
}

export interface Errors {
  expected: string;
  code: string;
  path: any[];
  message: string;
}
