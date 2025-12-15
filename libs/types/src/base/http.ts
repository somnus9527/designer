export enum HttpCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface ICommonResponse<
  C extends string | number = number,
  T extends any = any,
> {
  code: C;
  message: string;
  data: T;
}
