import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
let dbUrl;

export const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  dbUrl = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  };

  await mongoose.connect(dbUrl, mongooseOpts);  
};

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};
