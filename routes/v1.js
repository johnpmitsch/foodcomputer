const indexRouter = require("../controllers/v1/index");
const usersRouter = require("../controllers/v1/users");
const authenticationRouter = require("../controllers/v1/authentication");

module.exports = [
  { route: "", controller: indexRouter },
  { route: "users", controller: usersRouter },
  { route: "", controller: authenticationRouter }
];
