const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routesOne = require("./routes/v1");
const errorHandler = require("./middleware/errorHandler");
const winston = require("./config/winston");
const passport = require("./config/passport");

const app = express();

app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const namespaceOne = "/api/v1/";

routesOne.map(definition => {
  const { route, controller } = definition;
  const fullRoute = namespaceOne + route;
  app.use(fullRoute, controller);
  return null;
});

app.use(passport.initialize());
app.use(passport.session());

// Keep error handler middleware last
app.use(errorHandler);

module.exports = app;
