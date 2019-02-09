const jwt = require("jsonwebtoken");
const { FoodComputer, User } = require("../models");
const secretKey = require("../config/jwt");

async function setupUser(password = "mysecurepassword") {
  let jwtToken, foodComputer, user, error;
  try {
    user = await User.create({
      email: "test@test.com",
      username: "FCfan101",
      password
    });

    await jwt.sign(
      { id: user.id, email: user.email },
      secretKey,
      { expiresIn: "14d" },
      (err, token) => {
        if (err) throw Error(err);
        jwtToken = token;
      }
    );

    foodComputer = await FoodComputer.create({
      userId: user.id,
      name: "Lettuce Grower 3000"
    });
  } catch (e) {
    error = e;
  }
  return new Promise((resolve, reject) =>
    error ? reject(Error(error)) : resolve({ jwtToken, user, foodComputer })
  );
}

const destroyUsers = () =>
  new Promise((resolve, reject) => {
    User.destroy({ where: {} })
      .then(() => resolve())
      .catch(err => reject(err));
  });

module.exports = { setupUser, destroyUsers };
