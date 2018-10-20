const { FoodComputer, User } = require("../models");

const setupUser = (password = "mysecurepassword") =>
  new Promise((resolve, reject) => {
    User.create({
      email: "test@test.com",
      username: "FCfan101",
      password
    })
      .then(user => {
        FoodComputer.create({
          userId: user.id,
          name: "Lettuce Grower 3000"
        }).then(foodComputer => {
          resolve({ user, foodComputer });
        });
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
