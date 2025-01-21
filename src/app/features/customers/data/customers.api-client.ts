import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, ApiResponseResult, ApiSuccess } from '@poc/core/base/api-repsonse';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { handleHttpError } from '@poc/core/base/handle-errors';

export type CustomerDTO = {
  custID: string;
  code: string;
  fullName: string;
  tin: string;
  dueAt?: Date;
  balance?: number;
  overdue?: boolean;
};

@Injectable()
export class CustomersApiClient {
  #url = 'http://localhost:3200/api/customers-full';
  #http = inject(HttpClient);

  find(): Promise<ApiResponse<CustomerDTO[]>> {
    const call$ = this.#http.get<{ rows: CustomerDTO[] }>(this.#url).pipe(
      map(res => {
        return {
          result: ApiResponseResult.SUCCESS,
          data: res.rows
        } as ApiSuccess<CustomerDTO[]>;
      }),
      catchError(err => of(handleHttpError(err)))
    );

    return firstValueFrom(call$);
  }
}
