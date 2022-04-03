export interface Response<T = any> {
  code: number;
  data: T;
  token?: string;
  message: string;
}
