module.exports = (sequelize, DataTypes) => {
  const FoodComputer = sequelize.define(
    "FoodComputer",
    {
      name: DataTypes.STRING
    },
    {
      classMethods: {
        associate(_models) {
          // associations can be defined here
        }
      }
    }
  );
  return FoodComputer;
};
