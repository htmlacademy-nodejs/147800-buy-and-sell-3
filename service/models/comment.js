"use strict";

const { Model, DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
  class CommentModel extends Model {}

  CommentModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      offerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: `offer_id`
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: `user_id`
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: { type: DataTypes.DATE, field: `created_at` }
    },
    {
      sequelize,
      modelName: `CommentModel`,
      tableName: `comments`,
      timestamps: true,
      updatedAt: false
    }
  );

  return CommentModel;
};
