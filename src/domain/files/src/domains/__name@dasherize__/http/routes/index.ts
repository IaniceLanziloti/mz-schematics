import { inject, injectable } from 'inversify';
import { IRouter, IServer } from 'shared/http/server/interfaces';

@injectable()
class <%= classify(name) %>Router implements IRouter {
  contructor() {
    /*
      This is a blank a constructor.
      The app uses this to inject the domain routes
    */
  }

  public async register(_server: IServer) {
    /* This function logs all resource routes */
  }
}

export { <%= classify(name) %>Router };
