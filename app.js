const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routesOne = require("./routes/v1");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger("dev"));
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

// Keep error handler middleware last
app.use(errorHandler);

module.exports = app;
