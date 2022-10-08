const { DataTypes, Model } = require("sequelize");
const { STRING } = DataTypes;
const { dataSource, bcrypt } = require("../../../shared");

class User extends Model {
  static fullName(user) {
    return [user.firstName, user.lastName].join(" ");
  }

  static verifyPassword(user, rawPassword) {
    return bcrypt.compareSync(rawPassword, user.password);
  }
}

User.init(
  {
    firstName: {
      type: STRING,
    },
    lastName: {
      type: STRING,
    },
    username: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue("password", bcrypt.hashSync(value));
      },
    },
  },
  {
    sequelize: dataSource,
    underscored: true,
    indexes: [
      {
        fields: ["username"],
      },
      {
        fields: ["email"],
      },
    ],
  }
);

module.exports = User;
