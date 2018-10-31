const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const { Strategy } = require("passport-local");
const routesOne = require("./routes/v1");
const errorHandler = require("./middleware/errorHandler");
const { User } = require("./models");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new Strategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) return done(null, false, "User not found");
          return user.validPassword(password)
            ? done(null, user)
            : done(null, false, "Password is incorrect");
        })
        .catch(err => {
          if (err) return done(err);
          return false;
        });
    }
  )
);

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
