"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class CategoryModel extends Model {}

CategoryModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: `categories`,
    modelName: `CategoryModel`,
    schema: `public`,
    timestamps: false,
    indexes: [
      {
        name: `categories_pkey`,
        unique: true,
        fields: [{ name: `id` }]
      }
    ]
  }
);

module.exports = CategoryModel;
