const indexRouter = require("../controllers/v1/index");
const usersRouter = require("../controllers/v1/users");

module.exports = [
  { route: "", controller: indexRouter },
  { route: "users", controller: usersRouter }
];
