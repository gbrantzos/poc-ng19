export type QueryResult<T> = {
  rows: readonly T[];
  totalRows: number;
  pageSize?: number;
  pageNumber?: number;
};
