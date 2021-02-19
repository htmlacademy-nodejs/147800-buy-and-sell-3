"use strict";

const { Model, DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
  class UserModel extends Model {}

  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: `first_name`
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: `last_name`
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING
      },
      retinaPicture: {
        type: DataTypes.STRING,
        field: `retina_picture`
      }
    },
    {
      sequelize,
      modelName: `UserModel`,
      tableName: `users`,
      timestamps: false
    }
  );

  return UserModel;
};
