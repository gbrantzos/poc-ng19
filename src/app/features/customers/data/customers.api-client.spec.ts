import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiResponseResult } from '@poc/core/base/api-repsonse';
import customersResponse from '@poc/mocks/customers.json';

describe('Customers API Client', () => {
  function setup() {
    TestBed.configureTestingModule({
      providers: [CustomersApiClient, provideHttpClient(), provideHttpClientTesting()]
    });

    const httpTestingController = TestBed.inject(HttpTestingController);
    const apiClient = TestBed.inject(CustomersApiClient);
    const url = 'http://localhost:3200/api/customers';

    return { httpTestingController, apiClient, url };
  }

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('should create', () => {
    const { apiClient } = setup();

    expect(apiClient).toBeTruthy();
  });

  it('should get customers', async () => {
    const { httpTestingController, apiClient, url } = setup();

    const apiResponse = apiClient.find();
    const mockReq = httpTestingController.expectOne(url);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    const fakeCustomers = customersResponse;
    mockReq.flush(fakeCustomers);

    const response = await apiResponse;
    expect(response.result).toBe(ApiResponseResult.SUCCESS);
    if (response.result === ApiResponseResult.SUCCESS) {
      const data = response.data;
      expect(data).toEqual(fakeCustomers.rows);
    }
  });

  it('should handle server errors (problem details)', async () => {
    const { httpTestingController, apiClient, url } = setup();

    const apiResponse = apiClient.find();
    const mockReq = httpTestingController.expectOne(url);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    const problemDetails = {
      type: 'Bad Request',
      title: 'Bad Request',
      detail: 'Invalid search argument',
      status: 400
    };
    mockReq.flush(problemDetails, { status: 400, statusText: 'Bad Request' });

    const response = await apiResponse;
    expect(response.result).toBe(ApiResponseResult.ERROR);
    if (response.result === ApiResponseResult.ERROR) {
      expect(response.error).toEqual('Bad Request');
      expect(response.details).toEqual('Invalid search argument');
    }
  });

  it('should handle server errors (generic error)', async () => {
    const { httpTestingController, apiClient, url } = setup();

    const apiResponse = apiClient.find();
    const mockReq = httpTestingController.expectOne(url);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush('', { status: 501, statusText: 'Something bad happened' });

    const response = await apiResponse;
    expect(response.result).toBe(ApiResponseResult.ERROR);
    if (response.result === ApiResponseResult.ERROR) {
      expect(response.error).toEqual('Unexpected error server');
      expect(response.details).toEqual('Something bad happened - Error Code 501');
    }
  });

  it('should handle client errors', async () => {
    const { httpTestingController, apiClient, url } = setup();

    const apiResponse = apiClient.find();
    const mockReq = httpTestingController.expectOne(url);
    expect(mockReq.cancelled).toBeFalsy();

    mockReq.error(new ProgressEvent('error'), { statusText: 'Boom! Custom error!', status: 0 });

    const response = await apiResponse;

    expect(response.result).toBe(ApiResponseResult.ERROR);
    if (response.result === ApiResponseResult.ERROR) {
      expect(response.error).toBe('Client or network error');
      expect(response.details).toBe('Boom! Custom error!');
    }
  });
});