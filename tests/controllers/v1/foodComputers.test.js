const request = require("supertest");
const app = require("../../../app.js");
const assert = require("assert");
const FoodComputer = require("../../../models").FoodComputer;

afterEach(done => {
  FoodComputer.destroy({ where: {} })
    .then(() => done())
    .catch(err => err);
});

describe("GET /food-computers", () => {
  it("respond with json", done => {
    request(app)
      .get("/api/v1/food-computers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /food-computers", () => {
  it("object created successfully", done => {
    const mycomp = { name: "mycomp" };
    request(app)
      .post("/api/v1/food-computers")
      .send(mycomp)
      .expect(response => {
        assert(response.body.name, mycomp);
      })
      .expect(201, done);
  });
});
