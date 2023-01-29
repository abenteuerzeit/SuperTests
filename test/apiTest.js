const request = require("supertest");
const app = require("../app");
const { users } = require("../db");

describe("GET /users", () => {
  it("responds with 200 ok and json containing a list of all users", (done) => {
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /users/:id", () => {
  it("responds with 200 ok and json containing a single user retrieved by Id", (done) => {
    request(app)
      .get("/users/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /users/:id", () => {
  it("responds with 404 for non-existent user", (done) => {
    request(app)
      .get(`/users/${users.length + Math.floor(Math.random() * 100)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.error = "User not found";
      })
      .expect(404, done);
  });
});

const user = {
  name: "John Doe",
  email: "dummy@test.com",
  password: "DRPRT+uD@q?02",
  birthday: "1990-01-01",
  phone: "+1(123)456-7890",
  gender: "male",
};

describe("POST /users", () => {
  it("responds with 201 created and json containing a single user", (done) => {
    request(app)
      .post("/users")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("POST /users", () => {
  it("responds with 400 not created for bad request with invalid user", (done) => {
    request(app)
      .post("/users")
      .send(user)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.error = "Error adding user to database, this email is already in use";
      }, done)
      .expect(400, done);
    });
});