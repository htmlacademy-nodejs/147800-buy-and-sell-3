"use strict";

const { Model, DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
  class CategoriesModel extends Model {}

  CategoriesModel.init(
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
      timestamps: false
    }
  );

  return CategoriesModel;
};
