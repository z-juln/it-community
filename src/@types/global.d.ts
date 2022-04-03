export interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface Response<T = any> {
  code: number;
  data: T;
  token?: string;
  message: string;
}
