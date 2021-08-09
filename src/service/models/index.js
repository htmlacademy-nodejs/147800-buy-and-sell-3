"use strict";

const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../sequelize`);
const Category = require(`./categories`);
const Comment = require(`./comments`);
const Offer = require(`./offers`);
const User = require(`./users`);
const Aliase = require(`./constants/aliase`);

class OfferCategory extends Model {}
OfferCategory.init(
  {
    offerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `offer_id`,
      references: {
        model: `offers`,
        key: `id`
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `category_id`,
      references: {
        model: `categories`,
        key: `id`
      }
    }
  },
  {
    sequelize,
    modelName: `OfferCategory`,
    tableName: `offer_categories`,
    timestamps: false,
    schema: `public`,
    indexes: [
      {
        name: `offer_categories_pk`,
        unique: true,
        fields: [{ name: `id` }]
      }
    ]
  }
);

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

User.hasMany(Comment, { as: Aliase.COMMENTS, foreignKey: `userId` });
Comment.belongsTo(User, { as: Aliase.USER, foreignKey: `userId` });

User.hasMany(Offer, { as: Aliase.OFFERS, foreignKey: `userId` });
Offer.belongsTo(User, { as: Aliase.USER, foreignKey: `userId` });

module.exports = { Category, Comment, Offer, OfferCategory, User };
