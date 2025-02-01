import { Injectable } from '@angular/core';
import { BaseListClient, ListClient } from '@poc/core/base/api.list-client';

@Injectable()
export class CustomersApiClient extends BaseListClient implements ListClient {
  constructor() {
    super('http://localhost:3200/api/customers-full');
  }
}
