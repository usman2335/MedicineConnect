const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Appointment = require("../models/Appointment");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/medicine-connect-test");
});

afterEach(async () => {
  await Appointment.deleteMany(); // Clean DB after each test
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Appointment API", () => {
  let appointmentId;

  test("should create a new appointment", async () => {
    const res = await request(app).post("/api/appointments").send({
      fullName: "Test Patient",
      email: "test@example.com",
      phoneNumber: "1234567890",
      preferredDate: "2025-05-01",
      department: "Cardiology",
      doctor: "Dr. Smith",
      message: "Test message",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    appointmentId = res.body._id;
  });

  test("should get all appointments", async () => {
    await Appointment.create({
      fullName: "Patient 1",
      email: "one@example.com",
      phoneNumber: "9876543210",
      preferredDate: "2025-05-02",
      department: "Neurology",
      doctor: "Dr. Who",
    });

    const res = await request(app).get("/api/appointments");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("should get appointment by ID", async () => {
    const appointment = await Appointment.create({
      fullName: "Patient 2",
      email: "two@example.com",
      phoneNumber: "9999999999",
      preferredDate: "2025-05-03",
      department: "Ortho",
      doctor: "Dr. Bones",
    });

    const res = await request(app).get(`/api/appointments/${appointment._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("two@example.com");
  });

  test("should update an appointment", async () => {
    const appointment = await Appointment.create({
      fullName: "Patient 3",
      email: "three@example.com",
      phoneNumber: "1111111111",
      preferredDate: "2025-05-04",
      department: "Skin",
      doctor: "Dr. Strange",
    });

    const res = await request(app)
      .put(`/api/appointments/${appointment._id}`)
      .send({ phoneNumber: "2222222222" });

    expect(res.statusCode).toBe(200);
    expect(res.body.phoneNumber).toBe("2222222222");
  });

  test("should delete an appointment", async () => {
    const appointment = await Appointment.create({
      fullName: "Patient 4",
      email: "four@example.com",
      phoneNumber: "3333333333",
      preferredDate: "2025-05-05",
      department: "ENT",
      doctor: "Dr. Hear",
    });

    const res = await request(app).delete(
      `/api/appointments/${appointment._id}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Appointment deleted");
  });
});
