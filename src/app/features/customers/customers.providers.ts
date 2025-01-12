import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { CustomerStore } from '@poc/features/customers/data/customer.store';

export const provideCustomerServices = (): EnvironmentProviders => {
  return makeEnvironmentProviders([CustomersApiClient, CustomerStore]);
};
