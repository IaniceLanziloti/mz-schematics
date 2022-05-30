import { APPLICATION_ROUTES } from 'shared/container/identifiers';
import { inject, injectable } from 'inversify';

import { ErrorMiddleware, NotFoundMiddleware } from '../middlewares';
import { IRouter, IServer } from '../server/interfaces';

@injectable()
class Router implements IRouter {
  constructor(
    @inject(APPLICATION_ROUTES.NotFoundMiddleware)
    private notFoundMiddleware: NotFoundMiddleware,

    @inject(APPLICATION_ROUTES.ErrorMiddleware)
    private errorMiddleware: ErrorMiddleware
  ) {
    //
  }

  public async register(server: IServer) {
    this.notFoundMiddleware.register(server);
    /* The ErrorMiddleware must by the last route */
    this.errorMiddleware.register(server);
  }
}

export { Router };
