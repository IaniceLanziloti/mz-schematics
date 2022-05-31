import { Request, Response, Next } from 'shared/http/server/types';

import { 
  I<%= classify(name) %>IndexParamsDTO,
  I<%= classify(name) %>CreateBodyDTO,
  I<%= classify(name) %>ShowParamsDTO,
  I<%= classify(name) %>UpdateParamsDTO,
  I<%= classify(name) %>UpdateBodyDTO,
  I<%= classify(name) %>DeleteParamsDTO
} from '../../dtos/controllers'

class <%= classify(name) %>Controller {
  public async index(
    request: Request<I<%= classify(name) %>IndexParamsDTO>,
    response: Response,
    _next: Next
  ): Promise<Response> {
    return response.send();
  }
  
  public async create(
    request: Request<any, I<%= classify(name) %>CreateBodyDTO>,
    response: Response,
    _next: Next
  ): Promise<Response> {
    return response.send();
  }

  public async show(
    request: Request<I<%= classify(name) %>ShowParamsDTO>,
    response: Response,
    _next: Next
  ): Promise<Response> {
    return response.send();
  }

  public async update(
    request: Request<I<%= classify(name) %>UpdateParamsDTO, I<%= classify(name) %>UpdateBodyDTO>,
    response: Response,
    _next: Next

  ): Promise<Response> {
    return response.send()
  }

  public async delete(
    request: Request<I<%= classify(name) %>DeleteParamsDTO>,
    response: Response,
    _next: Next  
  ): Promise<Response> {
    return response.send()
  }
}

export { <%= classify(name) %>Controller  };
