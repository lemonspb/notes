const { MongoMemoryServer } = require("mongodb-memory-server");
import mongoose from "mongoose";

import request from "supertest";
import { MongoClient } from "mongodb";

import { app } from "../helpers/runApp";
import runMongo from "../helpers/mongo";

let server;
let mongoServer;
let mongos;
let dbUrl;
// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGO);
// });

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  dbUrl = mongoServer.getUri();
  mongos = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  server = await app;
});

/* Closing database connection after each test. */
afterEach(async () => {
  console.log(mongos.connection.collections);
  await mongoServer.stop();
});

describe("POST /auth/register", () => {
  it("register user", async () => {
    const res = await request(server)
      .post("/auth/register")
      .send({ email: "roma.skopenko@yandedx.ru", password: "mishamisha123" });
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
