import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}

import { App } from "./app";

new App().server.listen(3000);