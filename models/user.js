module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          models.User.hasMany(models.FoodComputer);
        }
      }
    }
  );
  return User;
};
