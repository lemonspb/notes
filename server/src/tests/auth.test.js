// import User from "../models/User";
// import bcrypt from "bcryptjs";
import { dbConnect, dbDisconnect } from "../helpers/dbTestingHandler";
import request from "supertest";
import { app } from "../helpers/runApp";

const testUser = {
  email: "test.test@test.ru",
  password: "testtest",
};

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("POST /auth/register", () => {
  it("user registration successful", async () => {
    const res = await request(app).post("/auth/register").send(testUser);
    expect(res.status).toBe(201);
  });
});

describe("POST /auth/login", () => {
  it("user authorization successful", async () => {
    const res = await request(app).post("/auth/login").send(testUser);
    expect(res.status).toBe(200);
  });
});
