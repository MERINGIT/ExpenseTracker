module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    choice: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  users.associate = (models) => {
    users.hasMany(models.expense, {
      onDelete: "cascade",
    });
  };

  return users;
};
