require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // adjust path if needed
const User = require("../models/User");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/medicine-connect-test");
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should sign up a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      role: "patient",
    });
    console.log("this is the res body" + res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("john@example.com");
  });

  it("should not signup with existing email", async () => {
    await User.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "hashedpassword",
      role: "doctor",
    });

    const res = await request(app).post("/api/auth/signup").send({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "password123",
      role: "doctor",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it("should login an existing user", async () => {
    const user = new User({
      firstName: "Sam",
      lastName: "Smith",
      email: "sam@example.com",
      password: "password123",
      role: "admin",
    });

    await user.save();

    const res = await request(app).post("/api/auth/login").send({
      email: "test123@gmail.com",
      password: "123123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with incorrect password", async () => {
    await User.create({
      firstName: "Lily",
      lastName: "Jones",
      email: "lily@example.com",
      password: "password123",
      role: "admin",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "lily@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid/i);
  });
});
