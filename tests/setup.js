const { FoodComputer, User } = require("../models");

const setupUser = () =>
  new Promise((resolve, reject) => {
    User.create({
      email: "test@test.com",
      password: "mysecurepassword",
      username: "FCfan101"
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
