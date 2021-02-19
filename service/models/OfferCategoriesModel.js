"use strict";

const { Model, DataTypes } = require(`sequelize`);

module.exports = (sequelize) => {
  class OfferCategoriesModel extends Model {}

  OfferCategoriesModel.init(
    {
      offerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: `offer_id`
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: `category_id`
      }
    },
    {
      sequelize,
      timestamps: false
    }
  );

  return OfferCategoriesModel;
};
