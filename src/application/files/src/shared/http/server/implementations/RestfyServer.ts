import { Server } from 'http';
import restify, {
  Server as RestifyInstance,
  Request,
  Response,
  Next,
} from 'restify';

import { IRouterErrorHandler, IRouterHandler } from '../interfaces';
import { IServer } from '../interfaces/IServer';

import { BaseServer } from './base/BaseServer';

class RestifyServer
  extends BaseServer
  implements IServer<RestifyInstance, Request, Response, Next>
{
  private app: RestifyInstance;

  constructor() {
    super();
    this.app = restify.createServer();
    this.app.use(restify.plugins.jsonBodyParser());

    /* Temporariamente removido, registrando rotas através do createApp - javascript -  */
    // this.registerRoutes(this);
  }

  public use(
    ...args:
      | [
          ...handlers:
            | IRouterHandler<Request, Response, Next>[]
            | IRouterErrorHandler<Request, Response, Next>[]
        ]
      | [path: string, ...handlers: IRouterHandler<Request, Response, Next>[]]
  ): void {
    if (typeof args[0] === 'string' && typeof args[1] === 'object') {
      // const path = args[0]
      const handlers = args[1] as IRouterHandler<Request, Response, Next>[];

      this.app.use(handlers);
      return;
    }

    const handlers = args as IRouterHandler<Request, Response, Next>[];

    this.app.use(handlers);
  }

  public get(
    path: string,
    ...handlers: IRouterHandler<Request, Response, Next>[]
  ): void {
    this.app.get(path, handlers);
  }

  public post(
    path: string,
    ...handlers: IRouterHandler<Request, Response, Next>[]
  ): void {
    this.app.post(path, handlers);
  }

  public put(
    path: string,
    ...handlers: IRouterHandler<Request, Response, Next>[]
  ): void {
    this.app.put(path, handlers);
  }

  public patch(
    path: string,
    ...handlers: IRouterHandler<Request, Response, Next>[]
  ): void {
    this.app.patch(path, handlers);
  }

  public delete(
    path: string,
    ...handlers: IRouterHandler<Request, Response, Next>[]
  ): void {
    this.app.del(path, handlers);
  }

  public listen(port: number): Server {
    this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(
        'Restify server is running on port [%s] in [%s] mode.',
        port,
        process.settings.app.nodeEnv
      );
    });
    return this.app;
  }

  public getApp(): RestifyInstance {
    return this.app;
  }
}

export { RestifyServer };
