"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class CategoryModel extends Model {}

CategoryModel.init(
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
    modelName: `CategoryModel`,
    tableName: `categories`,
    timestamps: false
  }
);

module.exports = CategoryModel;
