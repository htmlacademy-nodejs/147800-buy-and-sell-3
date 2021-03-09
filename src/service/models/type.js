"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class TypeModel extends Model {}

TypeModel.init(
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
    modelName: `TypeModel`,
    tableName: `types`,
    timestamps: false
  }
);

module.exports = TypeModel;
