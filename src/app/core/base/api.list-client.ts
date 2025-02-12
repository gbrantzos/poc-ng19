import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiResponse, ApiResponseResult, ApiSuccess } from '@poc/core/base/api.response';
import { handleHttpError } from '@poc/core/base/handle-errors';
import { QueryResult } from '@poc/core/base/query-result';
import { DEFAULT_PAGE_SIZE, SearchCriteria } from '@poc/core/base/search-criteria';
import { catchError, firstValueFrom, map, of } from 'rxjs';

export type ListItem = {
  id: string | number;
  [key: string]: unknown;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ListClient {
  find: (criteria: Partial<SearchCriteria>) => Promise<ApiResponse<QueryResult<ListItem>>>;
}

export abstract class BaseListClient implements ListClient {
  protected httpClient = inject(HttpClient);

  protected constructor(protected baseUrl: string) {}

  protected prepareFindUrl(): string {
    return this.baseUrl;
  }

  find(criteria: Partial<SearchCriteria>): Promise<ApiResponse<QueryResult<ListItem>>> {
    const params = this.prepareParams(criteria);
    const url = this.prepareFindUrl();
    const call$ = this.httpClient.get<QueryResult<ListItem>>(url, { params }).pipe(
      map(res => {
        return {
          result: ApiResponseResult.SUCCESS,
          data: res
        } as ApiSuccess<QueryResult<ListItem>>;
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
