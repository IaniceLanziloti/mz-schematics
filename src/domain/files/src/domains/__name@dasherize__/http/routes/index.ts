import { IRouter, IServer } from 'shared/http/server/interfaces';
import { inject, injectable } from 'inversify';

@injectable()
class <%= classify(name) %>Router implements IRouter {
  contructor() {}

  public async register(server:IServer) {} 
}

export { <%= classify(name) %>Router };