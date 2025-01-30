import { computed } from '@angular/core';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';

export type QuickSearch = {
  term: string;
};

export type Paging = {
  number: number;
  size: number;
};

export type Sorting = {
  field: string;
  direction: 'asc' | 'desc';
};

export type SearchCriteria = {
  quickSearch: QuickSearch;
  sorting: Sorting;
  paging: Paging;
};

export const DEFAULT_PAGE_SIZE = 25;

export function withSearchCriteria() {
  return signalStoreFeature(
    withState<SearchCriteria>({
      quickSearch: { term: '' },
      sorting: { field: '', direction: 'asc' },
      paging: { number: 1, size: DEFAULT_PAGE_SIZE }
    }),
    withComputed(store => ({
      searchCriteria: computed<SearchCriteria>(() => ({
        quickSearch: store.quickSearch(),
        sorting: store.sorting(),
        paging: store.paging()
      }))
    })),
    withMethods(store => ({
      updateCriteria: (criteria: Partial<SearchCriteria>) => {
        patchState(store, state => ({
          quickSearch: { ...state.quickSearch, ...criteria?.quickSearch },
          sorting: { ...state.sorting, ...criteria?.sorting },
          paging: { ...state.paging, ...criteria?.paging }
        }));
      }
    }))
  );
}
