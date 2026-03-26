export type Message = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string | null;
};

export type ApiError = {
  message: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};
