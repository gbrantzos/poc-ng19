import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { ApiResponseResult } from '@poc/core/base/api-repsonse';
import { withRequestState } from '@poc/core/base/request-state';
import { SearchCriteria, withSearchCriteria } from '@poc/core/base/search-criteria';
import { CustomerDTO, CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { Customer } from '@poc/features/customers/domain/customer';

export type CustomerState = {
  listItems: readonly Customer[];
  totalItems: number;
};

const initialState = (): CustomerState => {
  return {
    listItems: [],
    totalItems: 0
  };
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
        patchState(store, { listItems: [], totalItems: 0 });

        const response = await store.apiClient.find(store.searchCriteria());
        if (response.result == ApiResponseResult.SUCCESS) {
          const data = response.data;
          patchState(store, {
            listItems: data.rows.map(c => customerDtoToModel(c)),
            totalItems: data.totalRows
          });
          patchState(store, {
            paging: {
              number: data.pageNumber ?? 0,
              size: data.pageSize ?? 0
            }
          });
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
  dueAt: dto.dueAt ?? new Date(2025, 1, 1, 0, 0),
  balance: dto.balance ?? 0,
  overdue: dto.overdue ?? false
});
