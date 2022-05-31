import { injectable } from 'inversify';
import { AppError } from 'shared/errors/AppError';

import { Request, Response, Next } from '../server/types';

@injectable()
class NotImplementedMiddleware {
  public handle(
    _request: Request,
    _response: Response,
    _next: Next
  ): Promise<Response> {
    throw new AppError('Method not implemented', 400);
  }

}

export { NotImplementedMiddleware };
