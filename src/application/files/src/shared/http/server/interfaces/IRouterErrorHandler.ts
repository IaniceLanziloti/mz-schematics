interface IRouterErrorHandler<Req, Res, Nxt> {
  (error: any, request: Req, response: Res, next: Nxt): Promise<Res | void>;
}

export { IRouterErrorHandler };
