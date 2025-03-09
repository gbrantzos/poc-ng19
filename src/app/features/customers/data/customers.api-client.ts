/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createFindFn, ListClient, ListItem } from '@poc/core/base/api.list-client';
import { QueryResult } from '@poc/core/base/query-result';
import { LookupItem } from '@poc/core/services/lookup.service';
import { map, Observable } from 'rxjs';

export interface CustomerListItem extends ListItem {
  fullName: string;
}

@Injectable()
export class CustomersApiClient implements ListClient<CustomerListItem> {
  #httpClient = inject(HttpClient);
  #baseUrl = 'http://localhost:3200/api/customers';

  public find = createFindFn<CustomerListItem>(this.#httpClient, `${this.#baseUrl}-full`);

  public categories(): Observable<readonly LookupItem[]> {
    const url = `${this.#baseUrl}/categories`;
    return this.#httpClient.get<QueryResult<LookupItem>>(url).pipe(map(res => res.rows));
  }
}
