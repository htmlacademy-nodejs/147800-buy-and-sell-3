"use strict";

const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../sequelize`);

class CommentModel extends Model {}

CommentModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    offerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `offer_id`,
      references: {
        model: `offers`,
        key: `id`
      }
    },
    text: {
      type: DataTypes.TEXT,
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
    createdAt: { type: DataTypes.DATE, field: `created_at` }
  },
  {
    sequelize,
    modelName: `CommentModel`,
    tableName: `comments`,
    timestamps: true,
    updatedAt: false,
    schema: `public`,
    indexes: [
      {
        name: `comments_pkey`,
        unique: true,
        fields: [{ name: `id` }]
      }
    ]
  }
);

module.exports = CommentModel;
