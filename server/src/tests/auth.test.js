import { MongoMemoryReplSet } from "mongodb-memory-server";
import request from "supertest";
import { MongoClient } from "mongodb";

import { app } from "../helpers/runApp";
import runMongo from "../helpers/mongo";

let server;
let mongoServer;
let mongoose;

// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGO);
// });

beforeAll(async () => {
  mongoServer = await MongoMemoryReplSet.create({
    replSet: { count: 4, storageEngine: "wiredTiger" },
  });
  mongoose = await runMongo(await mongoServer.getUri());
  server = await app;
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.collections["users"].drop(() => {
    console.log("drop maza fuck");
  });
  await mongoServer.stop();
});

describe("POST /auth/register", () => {
  it("register user", async () => {
    const res = await request(server)
      .post("/auth/register")
      .send({ email: "roma.skopenko@yandex.ru", password: "mishamisha123" });
    expect(res.status).toBe(201);
  });
});

// describe("GET /api/products", () => {
//   it("should return all products", async () => {
//     const res = await request(server)
//       .post("/auth/login")
//       .send({ email: "misha.skopenko@yandex.ru", password: "mishamisha123" });
//     console.log(res);
//     expect(200).toBe(200);
//   });
// });