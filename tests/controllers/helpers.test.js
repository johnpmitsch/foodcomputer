const assert = require("assert");
const { errorMessage } = require("../../controllers/helpers");

describe("error message", () => {
  const msg = "Things broke";
  it("responds with correct json for array", () => {
    const res = errorMessage([msg]);
    assert.deepEqual(res.errors, [msg]);
  });

  it("responds with correct json for string", () => {
    const res = errorMessage(msg);
    assert.deepEqual(res.errors, [msg]);
  });
});
