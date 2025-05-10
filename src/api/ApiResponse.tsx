export interface apiResponse<T> {
    status: number;
    data: T;
    error: any;
  }