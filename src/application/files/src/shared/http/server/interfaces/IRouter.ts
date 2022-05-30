import { IServer } from './IServer';

interface IRouter {
  register(server: IServer): void;
}

export { IRouter };
