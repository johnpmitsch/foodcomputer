const request = require("supertest");
const assert = require("assert");
const app = require("../../../app.js");
const { setupUser, destroyUsers } = require("../../setup");

let testUser;
let testFoodComputer;

beforeEach(done => {
  setupUser()
    .then(({ foodComputer, user }) => {
      testFoodComputer = foodComputer;
      testUser = user;
      done();
    })
    .catch(err => err);
});

afterEach(done => {
  destroyUsers()
    .then(() => done())
    .catch(err => err);
});

describe("GET all food computers for user", () => {
  it("responds with json", done => {
    request(app)
      .get(`/api/v1/users/${testUser.id}/food-computers`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert(res.body.foodComputers.length);
      })
      .expect(200, done);
  });
});

describe("GET a food computer for user", () => {
  it("responds with json", done => {
    request(app)
      .get(`/api/v1/users/${testUser.id}/food-computers`)
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
      .post(`/api/v1/users/${testUser.id}/food-computers`)
      .send(mycomp)
      .expect(response => {
        assert(response.body.name, mycomp);
      })
      .expect(201, done);
  });
});

describe("Get a single food computer", () => {
  it("responds with resource", done => {
    request(app)
      .get(`/api/v1/users/${testUser.id}/food-computers/${testFoodComputer.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        assert(res.body.name);
      })
      .expect(200, done);
  });
});
