module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface
      .createTable("FoodComputers", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          unique: "userAndName"
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          unique: "userAndName",
          references: {
            model: "Users",
            key: "id"
          }
        }
      })
      .then(() => {
        queryInterface.addIndex("FoodComputers", {
          fields: ["userId", "name"],
          unique: true
        });
      })
      .catch(err => err);
  },
  down: (queryInterface, _Sequelize) =>
    queryInterface.dropTable("FoodComputers")
};
