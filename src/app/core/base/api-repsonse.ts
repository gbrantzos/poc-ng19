export enum ApiResponseResult {
  SUCCESS,
  ERROR
}

export interface ApiSuccess<T> {
  result: ApiResponseResult.SUCCESS;
  data: T;
}

export interface ApiError {
  result: ApiResponseResult.ERROR;
  error: string;
  details?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
