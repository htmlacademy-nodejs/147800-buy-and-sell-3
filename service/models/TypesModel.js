"use strict";

const { Model, DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
  class TypesModel extends Model {}

  TypesModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false
    }
  );

  return TypesModel;
};
