"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class OfferModel extends Model {}

OfferModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `type_id`
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `user_id`
    },
    picture: {
      type: DataTypes.STRING
    },
    retinaPicture: {
      type: DataTypes.STRING,
      field: `retina_picture`
    },
    createdAt: { type: DataTypes.DATE, field: `created_at` }
  },
  {
    sequelize,
    modelName: `OfferModel`,
    tableName: `offers`,
    timestamps: true,
    updatedAt: false
  }
);

module.exports = OfferModel;
