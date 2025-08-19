module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
      validate: { len: [10, 15] },
    },
    role: {
      type: DataTypes.ENUM("Manager", "Agent"),
      allowNull: false,
    },
  });

  return User;
};
