import { ExpressServer, FastifyServer, RestifyServer } from './implementations';

export class ServerFactory {
  public static create(): FastifyServer | RestifyServer | ExpressServer {
    const servers = {
      fastify: () => new FastifyServer(),
      restify: () => new RestifyServer(),
      express: () => new ExpressServer(),
    };

    const { serverType } = process.settings.app;

    return servers[serverType]();
  }
}
