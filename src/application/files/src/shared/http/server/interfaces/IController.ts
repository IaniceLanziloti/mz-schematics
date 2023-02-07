import { IRouterHandler } from './IRouterHandler';

interface IController<Request = any, Response = any, Next = any> {
  index: IRouterHandler<Request, Response, Next>;
  create: IRouterHandler<Request, Response, Next>;
  show: IRouterHandler<Request, Response, Next>;
  update: IRouterHandler<Request, Response, Next>;
  delete: IRouterHandler<Request, Response, Next>;
}

export { IController };
