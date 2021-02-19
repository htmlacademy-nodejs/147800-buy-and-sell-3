"use strict";

const { Model } = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const defineType = require(`./type`);
const Aliase = require(`./constants/aliase`);

module.exports = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);
  const Type = defineType(sequelize);

  class OfferCategory extends Model {}
  OfferCategory.init(
    {},
    {
      sequelize,
      modelName: `OfferCategory`,
      tableName: `offer_categories`,
      timestamps: false
    }
  );

  Offer.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `offerId` });
  Comment.belongsTo(Offer, { foreignKey: `offerId` });

  Type.hasMany(Offer, { as: Aliase.OFFERS, foreignKey: `typeId` });
  Offer.belongsTo(Type, { foreignKey: `typeId` });

  Offer.belongsToMany(Category, {
    through: OfferCategory,
    as: Aliase.CATEGORIES
  });
  Category.belongsToMany(Offer, { through: OfferCategory, as: Aliase.OFFERS });
  Category.hasMany(OfferCategory, { as: Aliase.OFFER_CATEGORIES });

  return { Category, Comment, Offer, OfferCategory };
};
