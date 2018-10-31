const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const passport = require("passport");
const { Strategy } = require("passport-local");
const jwt = require("jsonwebtoken");
const routesOne = require("./routes/v1");
const errorHandler = require("./middleware/errorHandler");
const { User } = require("./models");
const winston = require("./config/winston");

const app = express();
const env = process.env.NODE_ENV || "development";

app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let jwtSecretKey;
if (["development", "test"].includes(env)) {
  jwtSecretKey = "bobsaget";
} else {
  jwtSecretKey = process.env.JWT_SECRET_KEY;
}

passport.use(
  new Strategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) return done(null, false, "User not found");
          jwt.sign(
            { id: user.id, email: user.email },
            jwtSecretKey,
            { expiresIn: "14d" },
            (err, token) => {
              if (err) return done(err);
              return user.validPassword(password)
                ? done(null, token)
                : done(null, false, "Password is incorrect");
            }
          );
          return null;
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
