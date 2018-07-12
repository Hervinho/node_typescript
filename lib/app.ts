//Modules
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Request, Response, Router } from "express";

//Database config.
import { dbConfig } from "./config/db.config";

//API URLs
import { appRoutes } from "./config/routes.config";

//routes.
import TestRoute from "./routes/test.route";
import UserRoute from "./routes/user.route";

//Import authentication middleware
import Auth from "./auth/auth";

class App {
  
  private auth = Auth.authenticate;
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    mongoose.connect(dbConfig.url);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(this.auth);
  };

  private routes(): void {
    //route /test
    this.app.use(appRoutes.api.testBaseUrl, TestRoute);

    //route /users
    this.app.use(appRoutes.api.userBaseUrl, UserRoute);
  };

}

export default new App().app;