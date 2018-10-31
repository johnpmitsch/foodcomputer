const request = require("supertest");
const assert = require("assert");
const app = require("../../../app.js");
const { setupUser, destroyUsers } = require("../../setup");

let userEmail;
const userPassword = "testtesttest";

beforeEach(done => {
  setupUser(userPassword).then(({ user: { email } }) => {
    userEmail = email;
    done();
  });
});

afterEach(done => {
  destroyUsers()
    .then(() => done())
    .catch(err => err);
});

describe("User can log in", () => {
  it("completes successfully on correct login request", done => {
    request(app)
      .post("/api/v1/login")
      .send({ email: userEmail, password: userPassword })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("correct response is sent on bad password", done => {
    request(app)
      .post("/api/v1/login")
      .send({ email: userEmail, password: "NOTAPASSWORD" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert.strictEqual(res.body.error, "Password is incorrect");
      })
      .expect(400, done);
  });

  it("correct response is sent on bad email", done => {
    request(app)
      .post("/api/v1/login")
      .send({ email: "NOTANEMAIL@FAKEMAIL.COM", password: userPassword })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert.strictEqual(res.body.error, "User not found");
      })
      .expect(400, done);
  });
});
