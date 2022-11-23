import { MongoMemoryServer } from "mongodb-memory-server";
import * as request from "supertest";
import { Mongoose } from "mongoose";
import { Server } from "http";
import runApp from "../helpers/runApp";
import runMongo from "../helpers/mongo";
import { describe, expect, test } from "@jest/globals";

describe("Sample Test", () => {
  let server;
  let mongoServer;
  let mongoose;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoose = await runMongo(await mongoServer.getUri());
    server = await runApp();
    console.log(server);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });
});
