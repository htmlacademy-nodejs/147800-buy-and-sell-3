"use strict";

const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../sequelize`);
const Category = require(`./category`);
const Comment = require(`./comment`);
const Offer = require(`./offer`);
const Type = require(`./type`);
const User = require(`./user`);
const Aliase = require(`./constants/aliase`);

class OfferCategory extends Model {}
OfferCategory.init(
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
    modelName: `OfferCategory`,
    tableName: `offer_categories`,
    timestamps: false
  }
);

Type.hasOne(Offer, { foreignKey: `typeId` });
Offer.belongsTo(Type, { as: Aliase.TYPE, foreignKey: `typeId` });

Offer.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `offerId` });
Comment.belongsTo(Offer, { foreignKey: `offerId` });

Offer.belongsToMany(Category, {
  through: OfferCategory,
  as: Aliase.CATEGORIES,
  foreignKey: `offerId`
});
Category.belongsToMany(Offer, {
  through: OfferCategory,
  foreignKey: `categoryId`
});
Category.hasMany(OfferCategory, { foreignKey: `categoryId` });
Offer.hasMany(OfferCategory, { foreignKey: `offerId` });

// Comment.belongsTo(User, { foreignKey: `userId`, as: Aliase.USER });
// User.hasMany(Comment, { foreignKey: `userId` });

User.hasMany(Offer, { foreignKey: `userId` });
Offer.belongsTo(User, { as: Aliase.USER, foreignKey: `userId` });

module.exports = { Category, Comment, Offer, OfferCategory, Type, User };
