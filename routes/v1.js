const indexRouter = require("../controllers/v1/index");
const usersRouter = require("../controllers/v1/users");
const foodComputersRouter = require("../controllers/v1/foodComputers");

module.exports = [
  { route: "", controller: indexRouter },
  { route: "users", controller: usersRouter },
  { route: "food-computers", controller: foodComputersRouter }
];
