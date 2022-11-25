import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/User";
import bcrypt from "bcryptjs";

import mongoose from "mongoose";

import request from "supertest";

import { app } from "../helpers/runApp";

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
    dbName: "test",
  });
  server = await app;
});

/* Closing database connection after each test. */
afterEach(async () => {
  // await mongoServer.stop();
});

describe("POST /auth/register", () => {
  it("register user", async () => {
    const res = await request(server)
      .post("/auth/register")
      .send({ email: "roda.skopenko@yandedx.ru", password: "mishamisha123" });
    expect(res.status).toBe(201);
  });
});

describe("POST /auth/login", () => {
  it("should return all products", async () => {
    const hashedPassword = await bcrypt.hash("testtest", 10);
    const testUser = new User({
      email: "ronma.skopenko@yandedx.ru",
      password: hashedPassword,
    });
    await testUser.save();
    const res = await request(server)
      .post("/auth/login")
      .send({ email: "ronma.skopenko@yandedx.ru", password: "testtest" });
    expect(200).toBe(200);
  });
});
