const bcrypt = require("bcryptjs");

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

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.hook("beforeCreate", "beforeBulkCreate", (user, _options) =>
    bcrypt
      .hash(user.password, 10)
      .then(hash => {
        // eslint-disable-next-line no-param-reassign
        user.password = hash;
      })
      .catch(err => {
        throw new Error(err);
      })
  );

  return User;
};
