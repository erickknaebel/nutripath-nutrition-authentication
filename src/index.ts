import cors from 'cors';
import Database from './config/database';
import dotenv from 'dotenv';
import ErrorHandler from './middlewares/error.middleware';
import express, { Application } from 'express';
import helmet from 'helmet';
import Logger from './config/logger';
import morgan from 'morgan';
import routes from './routes';
import HeaderUtilities from './utils/header.util';

dotenv.config();

class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env: boolean;
  public errorHandler = new ErrorHandler();
  private db = new Database();
  private logStream = Logger.logStream;
  private logger = Logger.logger;
  private headerUtilities = new HeaderUtilities();

  constructor() {
    this.app = express();
    this.host = process.env.APP_HOST;
    this.port = process.env.APP_PORT;
    this.api_version = process.env.API_VERSION;

    this.initializeMiddleWares();
    this.initializeRoutes();
    this.initializeDatabase();
    this.initializeErrorHandlers();
    this.startApp();
  }

  public initializeMiddleWares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('combined', { stream: this.logStream }));
    this.app.use(this.headerUtilities.expose);
  }

  public initializeDatabase(): void {
    this.db.initializeDatabase();
  }

  public initializeRoutes(): void {
    this.app.use(`/api/${this.api_version}`, routes());
  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }

  public startApp(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;
