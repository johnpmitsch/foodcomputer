const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, _Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "hamsandwich",
          email: "ham@sandwich.com",
          password: bcrypt.hashSync("hamhamham"),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, _Sequelize) =>
    queryInterface.bulkDelete("Users", null, {})
};
