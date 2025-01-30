import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApiResponse, ApiResponseResult } from '@poc/core/base/api-repsonse';
import { ListItem } from '@poc/core/base/list-client';
import { QueryResult } from '@poc/core/base/query-result';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import CUSTOMERS_RESPONSE from '@poc/mocks/customers.json';

const fakeApiClient = {
  find: () =>
    Promise.resolve<ApiResponse<QueryResult<ListItem>>>({
      result: ApiResponseResult.SUCCESS,
      data: {
        rows: [],
        totalRows: 0,
        pageNumber: 0,
        pageSize: 0
      }
    })
};

describe('Customer Store', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [CustomerStore, { provide: CustomersApiClient, useValue: fakeApiClient }]
    });

    const store = TestBed.inject(CustomerStore);

    return { store, fakeApiClient };
  }

  it('should create with initial values', () => {
    const { store } = setup();

    expect(store).toBeTruthy();
    expect(store.listItems()).toEqual([]);
    expect(store.requestState()).toEqual('INIT');
  });

  it('should read customers from API client', async () => {
    const { store, fakeApiClient: api } = setup();

    const customersQueryResults: QueryResult<ListItem> = {
      rows: CUSTOMERS_RESPONSE.rows,
      totalRows: CUSTOMERS_RESPONSE.totalRows,
      pageSize: CUSTOMERS_RESPONSE.pageSize,
      pageNumber: CUSTOMERS_RESPONSE.pageNumber
    };
    const customers = customersQueryResults.rows;
    api.find = () => {
      const response: ApiResponse<QueryResult<ListItem>> = {
        result: ApiResponseResult.SUCCESS,
        data: {
          rows: customersQueryResults.rows,
          totalRows: customers.length
        }
      };
      return Promise.resolve(response);
    };
    await store.find();

    expect(store.requestState()).toEqual('LOADED');
    expect(store.listItems().length).toEqual(customers.length);
    expect(store.listItems()).toEqual(customers);
  });

  it('should read error from API client', async () => {
    const { store, fakeApiClient: api } = setup();

    api.find = () => {
      const response: ApiResponse<ListItem[]> = {
        result: ApiResponseResult.ERROR,
        error: 'Could not read from DB'
      };
      return Promise.resolve(response);
    };
    await store.find();

    expect(store.requestState()).toEqual({ message: 'Could not read from DB' });
  });

  it('should read error while calling API', async () => {
    const { store, fakeApiClient: api } = setup();

    api.find = () => Promise.reject(new Error('Something unusual happened!'));
    await store.find();

    expect(store.requestState()).toEqual({ message: 'Something unusual happened!' });
  });

  it('should set correct status while loading', fakeAsync(() => {
    const { store, fakeApiClient: api } = setup();

    api.find = () => {
      const response: ApiResponse<QueryResult<ListItem>> = {
        result: ApiResponseResult.SUCCESS,
        data: {
          rows: [],
          totalRows: 0
        }
      };
      return new Promise(r => setTimeout(() => r(response), 2000));
    };

    store.find();
    expect(store.requestState()).toBe('LOADING');

    tick(2300);
    expect(store.requestState()).toBe('LOADED');
    expect(store.listItems().length).toEqual(0);
  }));
});
