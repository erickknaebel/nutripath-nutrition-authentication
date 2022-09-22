/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class TestHelper {
  public mongod = new MongoMemoryServer();

  public connect = async () => {
    const uri = await this.mongod.getConnectionString();
    const mongooseOpts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoReconnect: true,
      useUnifiedTopology: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    };

    await mongoose.connect(uri, mongooseOpts);
  };

  public close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  };

  public clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteOne(() => {});
    }
  };
}

export default TestHelper;
