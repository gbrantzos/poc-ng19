import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, ApiResponseResult, ApiSuccess } from '@poc/core/base/api-repsonse';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { handleHttpError } from '@poc/core/base/handle-errors';

export interface CustomerDTO {
  custID: string;
  code: string;
  fullName: string;
  tin: string;
}

@Injectable()
export class CustomersApiClient {
  #url = 'http://localhost:3200/api/customers';
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
