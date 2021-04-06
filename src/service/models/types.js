"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class TypeModel extends Model {}

TypeModel.init(
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
    }
  },
  {
    sequelize,
    modelName: `TypeModel`,
    tableName: `types`,
    schema: `public`,
    timestamps: false,
    indexes: [
      {
        name: `types_pkey`,
        unique: true,
        fields: [{ name: `id` }]
      }
    ]
  }
);

module.exports = TypeModel;
