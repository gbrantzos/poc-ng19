import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { LookupService } from '@poc/core/services/lookup.service';
import { CustomerStore } from '@poc/features/customers/data/customer.store';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';

// Get more details here
// https://medium.com/netanelbasal/how-to-keep-your-angular-providers-from-ending-up-in-the-wrong-injector-151bd095ff0d

export class Lookups {
  public static readonly Categories = 'customer.categories';
}

export const provideCustomerServices = (): EnvironmentProviders => {
  return makeEnvironmentProviders([CustomersApiClient, CustomerStore, provideCustomerLookups()]);
};

const provideCustomerLookups = () => {
  return provideEnvironmentInitializer(() => {
    const initFn = (lookupService: LookupService, apiClient: CustomersApiClient) => {
      lookupService.register(Lookups.Categories, () => apiClient.categories());
    };
    return initFn(inject(LookupService), inject(CustomersApiClient));
  });
};
