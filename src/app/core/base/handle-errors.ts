import { HttpErrorResponse } from '@angular/common/http';
import { ApiError, ApiResponseResult } from '@poc/core/base/api-repsonse';
import { isProblemDetails } from '@poc/core/base/problem-details';

export function handleHttpError(httpError: HttpErrorResponse): ApiError {
  let error;

  let details: string | undefined;
  if (httpError.error instanceof ProgressEvent) {
    // Client-side errors, javascript or network related
    error = `Client or network error`;
    details = `${httpError.statusText}`;
  } else {
    // Server-side errors, attempt to extract ProblemDetails
    if (isProblemDetails(httpError.error)) {
      error = httpError.error.title;
      details = httpError.error.detail;
    } else {
      error = 'Unexpected error server';
      details = `${httpError.statusText} - Error Code ${httpError.status}`;
    }
  }

  return {
    result: ApiResponseResult.ERROR,
    error,
    details
  };
}
