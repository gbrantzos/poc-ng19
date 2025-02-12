import { Injectable } from '@angular/core';
import { BaseListClient, ListClient } from '@poc/core/base/api.list-client';
import { QueryResult } from '@poc/core/base/query-result';
import { LookupItem } from '@poc/core/services/lookup.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class CustomersApiClient extends BaseListClient implements ListClient {
  constructor() {
    super('http://localhost:3200/api/customers');
  }

  protected override prepareFindUrl(): string {
    return `${super.prepareFindUrl()}-full`;
  }

  public categories(): Observable<readonly LookupItem[]> {
    const url = `${this.baseUrl}/categories`;
    return this.httpClient.get<QueryResult<LookupItem>>(url).pipe(map(res => res.rows));
  }
}
