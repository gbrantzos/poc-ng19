import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { ApiResponseResult } from '@poc/core/base/api-repsonse';
import { withRequestState } from '@poc/core/base/request-state';
import { SearchCriteria, withSearchCriteria } from '@poc/core/base/search-criteria';
import { CustomerDTO, CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { Customer } from '@poc/features/customers/domain/customer';

export type CustomerState = {
  listItems: readonly Customer[];
};

const initialState = (): CustomerState => {
  return { listItems: [] };
};

export const CustomerStore = signalStore(
  withProps(() => ({
    apiClient: inject(CustomersApiClient)
  })),
  withState<CustomerState>(initialState()),
  withSearchCriteria(),
  withRequestState(),
  withMethods(store => ({
    async find(criteria: Partial<SearchCriteria> = {}): Promise<void> {
      store.updateCriteria(criteria);

      try {
        store.setLoading();
        patchState(store, { listItems: [] });
        const response = await store.apiClient.find();
        if (response.result == ApiResponseResult.SUCCESS) {
          patchState(store, { listItems: response.data.map(c => customerDtoToModel(c)) });
          store.setLoaded();
        }
        if (response.result == ApiResponseResult.ERROR) {
          store.setError(response.error);
        }
      } catch (e) {
        console.error('Error calling Customer API', e);
        store.setError((e as Error).message);
      }
    }
  }))
);

export const customerDtoToModel = (dto: CustomerDTO): Customer => ({
  id: dto.custID,
  code: dto.code,
  fullName: dto.fullName,
  tin: dto.tin,
  dueAt: dto.dueAt ?? new Date(),
  balance: dto.balance ?? 0,
  overdue: dto.overdue ?? false
});
