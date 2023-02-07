import { injectable, inject } from 'inversify';
import { APPLICATION_ROUTES } from 'shared/container/identifiers';
import { NotImplementedMiddleware } from 'shared/http/middlewares';
import { IRouter, IServer, IController } from 'shared/http/server/interfaces';

import { <%= toUpperCase(domain) %>_CONTROLLERS } from '../../identifiers';

@injectable()
class <%= classify(name) %>Router implements IRouter {
  constructor(
    @inject(<%= toUpperCase(domain) %>_CONTROLLERS.<%= classify(name)%>Controller)
    private <%= camelize(name) %>Controller: IController,

    @inject(APPLICATION_ROUTES.NotImplementedMiddleware)
    private notImplementedMiddleware: NotImplementedMiddleware
  ) {
    /*
      This is a blank a constructor.
      The app uses this to inject the resource controller
    */
  }

  public async register(server: IServer) {
    server.get('/api/<%= domain %>/<%= name %>/', this.<%= camelize(name) %>Controller.index);
    server.post('/api/<%= domain %>/<%= name %>/', this.<%= camelize(name) %>Controller.create);
    server.get(
      '/api/<%= domain %>/<%= name %>/:<%= camelize(name) %>',
      this.<%= camelize(name) %>Controller.show
    );
    server.put(
      '/api/<%= domain %>/<%= name %>/:<%= camelize(name) %>',
      this.<%= camelize(name) %>Controller.update
    );
    server.delete(
      '/api/<%= domain %>/<%= name %>/:<%= camelize(name) %>',
      this.<%= camelize(name) %>Controller.delete
    );
  }
}

export { <%= classify(name) %>Router };
