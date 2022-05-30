import { injectable } from 'inversify';
import { AppError } from 'shared/errors/AppError';

import { IServer } from '../server/interfaces';
import { Request, Response, Next } from '../server/types';

@injectable()
class NotFoundMiddleware {
  private async notFoundMiddleWare(
    _request: Request,
    _response: Response,
    _next: Next
  ): Promise<Response> {
    throw new AppError('Not Found', 404);
  }

  public register(server: IServer) {
    server.use(this.notFoundMiddleWare);
  }
}

export { NotFoundMiddleware };
