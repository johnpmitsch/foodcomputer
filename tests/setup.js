const jwt = require("jsonwebtoken");
const { FoodComputer, User } = require("../models");
const secretKey = require("../config/jwt");

const setupUser = (password = "mysecurepassword") =>
  new Promise((resolve, reject) => {
    User.create({
      email: "test@test.com",
      username: "FCfan101",
      password
    })
      .then(user => {
        let jwtToken;
        jwt.sign(
          { id: user.id, email: user.email },
          secretKey,
          { expiresIn: "14d" },
          (err, token) => {
            if (err) reject(err);
            jwtToken = token;

            FoodComputer.create({
              userId: user.id,
              name: "Lettuce Grower 3000"
            })
              .then(foodComputer => resolve({ jwtToken, user, foodComputer }))
              .catch(error => reject(error));
          }
        );
      })
      .catch(err => reject(err));
  });

const destroyUsers = () =>
  new Promise((resolve, reject) => {
    User.destroy({ where: {} })
      .then(() => resolve())
      .catch(err => reject(err));
  });

module.exports = { setupUser, destroyUsers };
