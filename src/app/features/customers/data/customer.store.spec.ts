import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApiResponse, ApiResponseResult } from '@poc/core/base/api-repsonse';
import { QueryResult } from '@poc/core/base/query-result';
import { customerDtoToModel, CustomerStore } from '@poc/features/customers/data/customer.store';
import { CustomerDTO, CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import customersResponse from '@poc/mocks/customers.json';

const fakeApiClient = {
  find: () =>
    Promise.resolve<ApiResponse<QueryResult<CustomerDTO>>>({
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

    const customersQueryResults: QueryResult<CustomerDTO> = {
      rows: customersResponse.rows.map(c => ({
        custID: c.custID,
        code: c.code,
        fullName: c.fullName,
        tin: c.tin,
        dueAt: new Date(c.dueAt),
        balance: c.balance,
        overdue: c.overdue
      })),
      totalRows: customersResponse.totalRows,
      pageSize: customersResponse.pageSize,
      pageNumber: customersResponse.pageNumber
    };
    const customers = customersQueryResults.rows as CustomerDTO[];
    api.find = () => {
      const response: ApiResponse<QueryResult<CustomerDTO>> = {
        result: ApiResponseResult.SUCCESS,
        data: {
          rows: customers,
          totalRows: customers.length
        }
      };
      return Promise.resolve(response);
    };
    await store.find();

    expect(store.requestState()).toEqual('LOADED');
    expect(store.listItems().length).toEqual(customers.length);
    expect(store.listItems()).toEqual(customers.map(c => customerDtoToModel(c)));
  });

  it('should read error from API client', async () => {
    const { store, fakeApiClient: api } = setup();

    api.find = () => {
      const response: ApiResponse<CustomerDTO[]> = {
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
      const response: ApiResponse<QueryResult<CustomerDTO>> = {
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
