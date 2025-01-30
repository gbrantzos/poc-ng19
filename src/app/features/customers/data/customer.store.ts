import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { ApiResponseResult } from '@poc/core/base/api-repsonse';
import { ListItem } from '@poc/core/base/list-client';
import { withRequestState } from '@poc/core/base/request-state';
import { DEFAULT_PAGE_SIZE, SearchCriteria, withSearchCriteria } from '@poc/core/base/search-criteria';
import { CustomersApiClient } from '@poc/features/customers/data/customers.api-client';
import { Customer } from '@poc/features/customers/domain/customer';

export type CustomerState = {
  listItems: readonly ListItem[];
  totalItems: number;
  selected: Customer | null;
};

const initialState = (): CustomerState => {
  return {
    listItems: [],
    totalItems: 0,
    selected: null
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
            listItems: data.rows,
            totalItems: data.totalRows
          });
          patchState(store, {
            paging: {
              number: data.pageNumber ?? 1,
              size: data.pageSize ?? DEFAULT_PAGE_SIZE
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
    },
    load() {
      patchState(store, {
        selected: {
          id: '',
          code: '',
          fullName: '',
          tin: ''
        } as Customer
      });
    },
    clear() {
      patchState(store, { selected: null });
    }
  }))
);
