"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    avatar: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: `UserModel`,
    tableName: `users`,
    schema: `public`,
    timestamps: false,
    indexes: [
      {
        name: `users_pk`,
        unique: true,
        fields: [{ name: `id` }]
      }
    ]
  }
);

module.exports = UserModel;
