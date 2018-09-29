"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const names = ["mars computer", "venus computer", "moon computer"];
    const nameList = [];
    names.map(name => {
      nameList.push({
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    return queryInterface.bulkInsert("FoodComputers", nameList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("FoodComputers", null, {});
  }
};
