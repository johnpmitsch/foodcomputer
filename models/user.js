module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
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
