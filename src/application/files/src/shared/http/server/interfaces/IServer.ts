import { Server } from 'http';

import { IRouterErrorHandler } from './IRouterErrorHandler';
import { IRouterHandler } from './IRouterHandler';

interface IServerRouterHandler<Req, Res, Nxt> {
  (
    ...handlers:
      | IRouterHandler<Req, Res, Nxt>[]
      | IRouterErrorHandler<Req, Res, Nxt>[]
  );
}

interface IServerRouterMatcher<Req, Res, Nxt> {
  (path: string, ...handlers: IRouterHandler<Req, Res, Nxt>[]);
}

interface IServer<ServerType = any, Req = any, Res = any, Nxt = any> {
  getApp(): ServerType;

  registerRoutes(server: ServerType, routesPaths: string[]): Promise<void>;

  listen(port: number): Server;

  use: IServerRouterHandler<Req, Res, Nxt> &
    IServerRouterMatcher<Req, Res, Nxt>;

  get(path: string, ...handlers: IRouterHandler<Req, Res, Nxt>[]): void;
  post(path: string, ...handlers: IRouterHandler<Req, Res, Nxt>[]): void;
  put(path: string, ...handlers: IRouterHandler<Req, Res, Nxt>[]): void;
  patch(path: string, ...handlers: IRouterHandler<Req, Res, Nxt>[]): void;
  delete(path: string, ...handlers: IRouterHandler<Req, Res, Nxt>[]): void;
}

export { IServer };
