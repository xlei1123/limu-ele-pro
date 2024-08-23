export interface PageQueryParam {
  limit: number;
  start: number;
}

export interface PageResult<T> {
  rows: T;
  total: number;
}
