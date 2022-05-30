import { Request as ExpressRequest } from 'express';

type Request<IParams = any, IBody = any, IQuery = any> = ExpressRequest<
  IParams,
  any,
  IBody,
  IQuery
> & {
  decodedToken: object;
  file: any;
};

export { Request };
