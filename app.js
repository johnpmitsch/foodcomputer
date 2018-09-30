const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes_v1 = require("./routes/v1");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const namespace_v1 = "/api/v1/";

routes_v1.map(definition => {
  let { route, controller } = definition;
  let path = namespace_v1 + route;
  app.use(path, controller);
});

module.exports = app;
