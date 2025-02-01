export enum ApiResponseResult {
  SUCCESS,
  ERROR
}

export type ApiSuccess<T> = {
  result: ApiResponseResult.SUCCESS;
  data: T;
};

export type ApiError = {
  result: ApiResponseResult.ERROR;
  error: string;
  details?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
