"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class OfferModel extends Model {}

OfferModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `user_id`,
      references: {
        model: `users`,
        key: `id`
      }
    },
    picture: {
      type: DataTypes.STRING
    },
    createdAt: { type: DataTypes.DATE, field: `created_at` }
  },
  {
    sequelize,
    modelName: `OfferModel`,
    tableName: `offers`,
    schema: `public`,
    timestamps: true,
    updatedAt: false,
    indexes: [
      {
        name: `offers_pkey`,
        unique: true,
        fields: [{ name: `id` }]
      }
    ]
  }
);

module.exports = OfferModel;
