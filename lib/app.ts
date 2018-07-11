//Modules
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, Router } from "express";

//API URLs
import { appRoutes } from './config/routes';

//routes.
import TestRoute from './routes/test.route';

//Import authentication middleware
import Auth from './auth/auth';

class App {
  
  private auth = Auth.authenticate;
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(this.auth);
  };

  private routes(): void {
    //route /test
    this.app.use(appRoutes.api.testBaseUrl, TestRoute);

  };

}

export default new App().app;