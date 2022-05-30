import 'express-async-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { injectable } from 'inversify';

import { IRouterErrorHandler, IRouterHandler, IServer } from '../interfaces';

import { BaseServer } from './base/BaseServer';

@injectable()
class ExpressServer
  extends BaseServer
  implements IServer<Express, Request, Response, NextFunction>
{
  private app: Express;

  constructor() {
    super();
    this.app = express();
    this.app.use(express.json());
    /* Temporariamente removido, registrando rotas através do createApp - javascript -  */
    // this.registerRoutes(this)
  }

  public use(
    ...args:
      | [
          ...handlers:
            | IRouterHandler<Request, Response, NextFunction>[]
            | IRouterErrorHandler<Request, Response, NextFunction>[]
        ]
      | [
          path: string,
          ...handlers: IRouterHandler<Request, Response, NextFunction>[]
        ]
  ): void {
    if (typeof args[0] === 'string' && typeof args[1] === 'object') {
      const path = args[0];
      const handlers = args[1] as IRouterHandler<
        Request,
        Response,
        NextFunction
      >[];

      this.app.use(path, handlers);
      return;
    }

    const handlers = args as IRouterHandler<Request, Response, NextFunction>[];

    this.app.use(handlers);
  }

  public get(
    path: string,
    ...handlers: IRouterHandler<Request, Response, NextFunction>[]
  ): void {
    this.app.get(path, handlers);
  }

  public post(
    path: string,
    ...handlers: IRouterHandler<Request, Response, NextFunction>[]
  ): void {
    this.app.post(path, handlers);
  }

  public put(
    path: string,
    ...handlers: IRouterHandler<Request, Response, NextFunction>[]
  ): void {
    this.app.put(path, handlers);
  }

  public patch(
    path: string,
    ...handlers: IRouterHandler<Request, Response, NextFunction>[]
  ): void {
    this.app.patch(path, handlers);
  }

  public delete(
    path: string,
    ...handlers: IRouterHandler<Request, Response, NextFunction>[]
  ): void {
    this.app.delete(path, handlers);
  }

  public listen(port: number): Server {
    return this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(
        'Express server is running on port [%s] in [%s] mode.',
        port,
        process.settings.app.nodeEnv
      );
    });
  }

  public getApp(): Express {
    return this.app;
  }
}

export { ExpressServer };
