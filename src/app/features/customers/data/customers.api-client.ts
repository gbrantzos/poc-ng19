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

const DEFAULT_PAGE_SIZE = 25;

@Injectable()
export class CustomersApiClient {
  #url = 'http://localhost:3200/api/customers-full';
  #http = inject(HttpClient);

  find(criteria: Partial<SearchCriteria>): Promise<ApiResponse<QueryResult<CustomerDTO>>> {
    const params = this.prepareParams(criteria);
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

  private prepareParams(criteria: Partial<SearchCriteria>): HttpParams {
    let params: HttpParams = new HttpParams();

    if (criteria.paging) {
      params = params
        .append('pageNumber', criteria.paging?.number ?? 1)
        .append('pageSize', criteria.paging?.size ?? DEFAULT_PAGE_SIZE);
    }

    if (criteria.sorting) {
      const term = criteria.sorting.direction == 'desc' ? `-${criteria.sorting.field}` : criteria.sorting.field;
      params = params.append('sortBy', term);
    }

    if (criteria.quickSearch) {
      params = params.append('q', `*:${criteria.quickSearch.term}`);
    }

    return params;
  }
}
