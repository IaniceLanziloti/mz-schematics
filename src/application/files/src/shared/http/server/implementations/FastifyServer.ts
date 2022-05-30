import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteHandlerMethod,
} from 'fastify';
import { Server } from 'http';

import { IRouterErrorHandler, IRouterHandler } from '../interfaces';
import { IServer } from '../interfaces/IServer';

import { BaseServer } from './base/BaseServer';

class FastifyServer
  extends BaseServer
  implements IServer<FastifyInstance, FastifyRequest, FastifyReply, any>
{
  private app: FastifyInstance;

  constructor() {
    super();
    this.app = fastify();
    /* Temporariamente removido, registrando rotas através do createApp - javascript -  */
    // this.registerRoutes(this);
  }

  public use(
    ...args:
      | [
          ...handlers:
            | IRouterHandler<FastifyRequest, FastifyReply, any>[]
            | IRouterErrorHandler<FastifyRequest, FastifyReply, any>[]
        ]
      | [
          path: string,
          ...handlers: IRouterHandler<FastifyRequest, FastifyReply, any>[]
        ]
  ): void {
    // eslint-disable-next-line no-console
    console.log(args);
    /*
      Middleware is not supported out of the box and requires an external plugin
      WARN: https://www.fastify.io/docs/latest/Reference/Middleware/
    */
    // if (typeof args[0] === 'string' && typeof args[1] === 'object') {
    //   const path = args[0]
    //   const handlers = args[1] as IRouterHandler<FastifyRequest, FastifyReply, any>[]
    //   this.app.all(path,{}, handlers[0] as RouteHandlerMethod)
    //   return
    // }
    // const handlers = args as IRouterHandler<FastifyRequest, FastifyReply, any>[]
    // this.app.all("/",{}, handlers[0] as RouteHandlerMethod)
  }

  public get(
    path: string,
    ...handles: IRouterHandler<FastifyRequest, FastifyReply, any>[]
  ): void {
    const handle = handles[0] as RouteHandlerMethod;
    this.app.get(path, {}, handle);
  }

  public post(
    path: string,
    ...handles: IRouterHandler<FastifyRequest, FastifyReply, any>[]
  ): void {
    const handle = handles[0] as RouteHandlerMethod;
    this.app.post(path, {}, handle);
  }

  public put(
    path: string,
    ...handles: IRouterHandler<FastifyRequest, FastifyReply, any>[]
  ): void {
    const handle = handles[0] as RouteHandlerMethod;
    this.app.put(path, {}, handle);
  }

  public patch(
    path: string,
    ...handles: IRouterHandler<FastifyRequest, FastifyReply, any>[]
  ): void {
    const handle = handles[0] as RouteHandlerMethod;
    this.app.patch(path, {}, handle);
  }

  public delete(
    path: string,
    ...handles: IRouterHandler<FastifyRequest, FastifyReply, any>[]
  ): void {
    const handle = handles[0] as RouteHandlerMethod;
    this.app.delete(path, {}, handle);
  }

  public listen(port: number): Server {
    this.app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(
        'Fastify server is running on port [%s] in [%s] mode.',
        port,
        process.settings.app.nodeEnv
      );
    });
    return this.app.server;
  }

  public getApp(): FastifyInstance {
    return this.app;
  }
}

export { FastifyServer };
