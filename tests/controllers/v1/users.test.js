const request = require("supertest");
const assert = require("assert");
const { FoodComputer, User } = require("../../../models");
const app = require("../../../app.js");

let userId;

beforeEach(done => {
  User.create({
    email: "test@test.com",
    password: "mysecurepassword",
    username: "FCfan101"
  })
    .then(user => {
      userId = user.id;
      FoodComputer.create({
        userId,
        name: "Lettuce Grower 3000"
      }).then(() => done());
    })
    .catch(err => err);
});

afterEach(done => {
  User.destroy({ where: {} })
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

describe("GET all food computers for user", () => {
  it("responds with json", done => {
    request(app)
      .get(`/api/v1/users/${userId}/food-computers`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert(res.body.foodComputers.length);
      })
      .expect(200, done);
  });
});

describe("Create a food computer", () => {
  it("object created successfully", done => {
    const mycomp = { name: "mycomp" };
    request(app)
      .post(`/api/v1/users/${userId}/food-computers`)
      .send(mycomp)
      .expect(response => {
        assert(response.body.name, mycomp);
      })
      .expect(201, done);
  });
});
