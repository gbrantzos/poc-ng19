import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { CustomerStore } from '@poc/features/customers/data/customer.store';

// Get more details here
// https://medium.com/netanelbasal/how-to-keep-your-angular-providers-from-ending-up-in-the-wrong-injector-151bd095ff0d

export const provideCustomerServices = (): EnvironmentProviders => {
  return makeEnvironmentProviders([CustomersApiClient, CustomerStore]);
};
