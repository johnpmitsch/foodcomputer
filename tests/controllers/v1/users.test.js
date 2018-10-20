const request = require("supertest");
const assert = require("assert");
const app = require("../../../app.js");
const { User } = require("../../../models");
const { setupUser, destroyUsers } = require("../../setup");

let userId;
const userPassword = "somesafepassword";

beforeEach(done => {
  setupUser(userPassword).then(({ user: { id } }) => {
    userId = id;
    done();
  });
});

afterEach(done => {
  destroyUsers()
    .then(() => done())
    .catch(err => err);
});

// describe("Create a user", () => {
//  it("creates a user successfully", done => {
//  }
// });

describe("GET a specific user", () => {
  it("respond with json", done => {
    request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert(res.body.email);
        // Don't want to return password to client
        assert.strictEqual(res.body.password, undefined);
        User.findById(userId)
          .then(user => {
            assert(user);
            // hashed password and plain text password match
            assert(user.validPassword(userPassword));
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .expect(200, done);
  });

  it("returns user not found", done => {
    request(app)
      .get("/api/v1/users/0")
      .set("Accept", "application/json")
      .expect(res => {
        assert(res.body.errors.includes("User not found"));
      })
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});
