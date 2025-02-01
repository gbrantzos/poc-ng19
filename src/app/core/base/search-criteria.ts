export const DEFAULT_PAGE_SIZE = 25;

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
