import { inject, ProviderToken } from '@angular/core';
import { patchState, signalStoreFeature, withMethods, withProps, withState } from '@ngrx/signals';
import { ListClient, ListItem } from '@poc/core/base/api.list-client';
import { ApiResponseResult } from '@poc/core/base/api.response';
import { DEFAULT_PAGE_SIZE, SearchCriteria } from '@poc/core/base/search-criteria';
import { withRequestState } from '@poc/core/base/store.request-state';

export const INITIAL_SEARCH_CRITERIA: SearchCriteria = {
  quickSearch: { term: '' },
  sorting: { field: '', direction: 'asc' },
  paging: { number: 1, size: DEFAULT_PAGE_SIZE }
};

export function withDataTableState(client: ProviderToken<ListClient>) {
  return signalStoreFeature(
    // Data table state, list items and totalItems count
    withState<{
      listItems: readonly ListItem[];
      totalItems: number;
    }>({ listItems: [], totalItems: 0 }),

    // Search Criteria
    withState<{
      searchCriteria: SearchCriteria;
    }>({ searchCriteria: INITIAL_SEARCH_CRITERIA }),

    // Base API client
    withProps(() => ({
      _apiClient: inject(client)
    })),

    // Request state
    withRequestState(),

    // Update criteria
    withMethods(store => ({
      _updateCriteria: (criteria: Partial<SearchCriteria>) => {
        patchState(store, state => ({
          searchCriteria: {
            quickSearch: { ...state.searchCriteria.quickSearch, ...criteria?.quickSearch },
            sorting: { ...state.searchCriteria.sorting, ...criteria?.sorting },
            paging: { ...state.searchCriteria.paging, ...criteria?.paging }
          }
        }));
      }
    })),

    // Actual API calls
    withMethods(store => ({
      async find(criteria: Partial<SearchCriteria> = {}): Promise<void> {
        store._updateCriteria(criteria);

        try {
          store.setLoading();
          patchState(store, { listItems: [], totalItems: 0 });

          const response = await store._apiClient.find(store.searchCriteria());
          if (response.result == ApiResponseResult.SUCCESS) {
            const data = response.data;
            patchState(store, {
              listItems: data.rows,
              totalItems: data.totalRows
            });
            patchState(store, state => ({
              searchCriteria: {
                quickSearch: { ...state.searchCriteria.quickSearch, ...criteria?.quickSearch },
                sorting: { ...state.searchCriteria.sorting, ...criteria?.sorting },
                paging: {
                  number: data.pageNumber ?? 1,
                  size: data.pageSize ?? DEFAULT_PAGE_SIZE
                }
              }
            }));
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
}
