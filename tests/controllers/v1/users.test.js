const request = require("supertest");
const assert = require("assert");
const app = require("../../../app.js");
const { setupUser, destroyUsers } = require("../../setup");

let userId;

beforeEach(done => {
  setupUser().then(({ user: { id } }) => {
    userId = id;
    done();
  });
});

afterEach(done => {
  destroyUsers()
    .then(() => done())
    .catch(err => err);
});

describe("GET a specific user", () => {
  it("respond with json", done => {
    request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert(res.body.email);
      })
      .expect(200, done);
  });

  it("returns user not found", done => {
    request(app)
      .get("/api/v1/users/0")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        res.body.errors.includes("User not found");
      })
      .expect(404, done);
  });
});
