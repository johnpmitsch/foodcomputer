const request = require("supertest");
const app = require("../../app.js");
const assert = require("assert");

describe("GET /foodComputers", () => {
  it("respond with json", done => {
    request(app)
      .get("/food-computers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /food-computers", () => {
  it("object created successfully", done => {
    const mycomp = { name: "mycomp" };
    request(app)
      .post("/food-computers")
      .send(mycomp)
      .expect(response => {
        assert(response.body.name, mycomp);
      })
      .expect(201, done);
  });
});
