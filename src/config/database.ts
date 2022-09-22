import { Error } from '../constants/error.messages';
import { Info } from '../constants/info.messages';
import Logger from './logger';
import mongoose from 'mongoose';

class Database {
  private DATABASE: string;
  private logger;

  constructor() {
    this.DATABASE =
      process.env.NODE_ENV === 'test'
        ? process.env.DATABASE_TEST
        : process.env.DATABASE;

    this.logger = Logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      await mongoose.connect(this.DATABASE, {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.logger.info(Info.DB_CONNECTED);
    } catch (error) {
      this.logger.error(Error.FAILED_CONNECTION, error);
    }
  };
}
export default Database;
