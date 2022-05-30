interface IRouterHandler<Req, Res, Nxt> {
  (request: Req, response: Res, next: Nxt): Promise<Res | void>;
}

export { IRouterHandler };
