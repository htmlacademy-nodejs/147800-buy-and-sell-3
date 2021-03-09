"use strict";

const { Model } = require(`sequelize`);
const sequelize = require(`../sequelize`);
const Category = require(`./category`);
const Comment = require(`./comment`);
const Offer = require(`./offer`);
const Type = require(`./type`);
const User = require(`./user`);
const Aliase = require(`./constants/aliase`);

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

Offer.hasOne(Type, { as: Aliase.TYPES, foreignKey: `typeId` });
Type.belongsTo(Offer);

Offer.hasMany(Comment, { as: Aliase.COMMENTS });
Comment.belongsTo(Offer, { foreignKey: `offerId` });

Offer.belongsToMany(Category, {
  through: OfferCategory,
  as: Aliase.CATEGORIES
});
Category.belongsToMany(Offer, { through: OfferCategory, as: Aliase.OFFERS });
Category.hasMany(OfferCategory, { as: Aliase.OFFER_CATEGORIES });

// User.hasMany(Comment, { as: Aliase.COMMENTS });
// Comment.belongsTo(User, { foreignKey: `userId` });

// User.hasMany(Offer, { as: Aliase.OFFERS });
// Offer.belongsTo(User, { foreignKey: `userId` });

module.exports = { Category, Comment, Offer, Type, User };
