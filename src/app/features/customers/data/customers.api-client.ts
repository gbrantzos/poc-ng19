import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse, ApiResponseResult, ApiSuccess } from '@poc/core/base/api-repsonse';
import { handleHttpError } from '@poc/core/base/handle-errors';
import { QueryResult } from '@poc/core/base/query-result';
import { SearchCriteria } from '@poc/core/base/search-criteria';
import { catchError, firstValueFrom, map, of } from 'rxjs';

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

  find(criteria: Partial<SearchCriteria>): Promise<ApiResponse<QueryResult<CustomerDTO>>> {
    const params: HttpParams = new HttpParams()
      .set('pageNumber', criteria.paging?.number ?? 1)
      .set('pageSize', criteria.paging?.size ?? 25);
    const call$ = this.#http.get<QueryResult<CustomerDTO>>(this.#url, { params }).pipe(
      map(res => {
        return {
          result: ApiResponseResult.SUCCESS,
          data: res
        } as ApiSuccess<QueryResult<CustomerDTO>>;
      }),
      catchError(err => of(handleHttpError(err)))
    );

    return firstValueFrom(call$);
  }
}
