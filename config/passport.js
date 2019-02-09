const passport = require("passport");
const { Strategy } = require("passport-local");
const jwt = require("jsonwebtoken");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const secretKey = require("./jwt");

const jwtOptions = {};
jwtOptions.secretOrKey = secretKey;
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

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
            jwtOptions.secretOrKey,
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

passport.use(
  new JwtStrategy(jwtOptions, (payload, done) => {
    User.findOne({
      where: {
        id: payload.id
      },
      attributes: {
        exclude: ["password"]
      }
    })
      .then(user =>
        user ? done(null, user) : done(null, false, "User not found")
      )
      .catch(err => {
        done(err, false);
      });
  })
);

module.exports = passport;
