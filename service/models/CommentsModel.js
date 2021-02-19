"use strict";

const { Model, DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
  class CommentsModel extends Model {}

  CommentsModel.init(
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
      timestamps: true,
      updatedAt: false
    }
  );

  return CommentsModel;
};
