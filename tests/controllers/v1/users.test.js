const request = require("supertest");
const assert = require("assert");
const app = require("../../../app.js");
const { User } = require("../../../models");
const { setupUser, destroyUsers } = require("../../setup");

let userId;
let token;
const userPassword = "somesafepassword";

beforeEach(done => {
  setupUser(userPassword)
    .then(({ user: { id }, jwtToken }) => {
      userId = id;
      token = jwtToken;
      done();
    })
    .catch(err => {
      throw Error(err);
    });
});

afterEach(done => {
  destroyUsers()
    .then(() => done())
    .catch(err => {
      throw Error(err);
    });
});

describe("GET a specific user", () => {
  it("respond with json", done => {
    request(app)
      .get("/api/v1/users/")
      .set("Accept", "application/json")
      .set("Authorization", `bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(res => {
        assert(res.body.email);
        // Don't want to return password to client
        assert.strictEqual(res.body.password, undefined);
        User.findByPk(userId)
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

  it("responds with bad request with no token", done => {
    request(app)
      .get("/api/v1/users/")
      .set("Accept", "application/json")
      .expect(400, done);
  });
});
