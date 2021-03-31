"use strict";

const Aliase = require(`../models/constants/aliase`);
const {
  Category,
  Comment,
  Offer,
  Type,
  User,
  OfferCategory
} = require(`../models/index`);

class OfferService {
  async findAll({ userId, categoryId }) {
    const offers = await Offer.findAll({
      include: [
        {
          model: Comment,
          as: Aliase.COMMENTS
        },
        Aliase.TYPE,
        { model: User, as: Aliase.USER, where: userId ? { id: userId } : {} },
        {
          model: Category,
          as: Aliase.CATEGORIES,
          where: categoryId ? { id: categoryId } : {}
        }
      ],
      attributes: { exclude: [`typeId`, `userId`] }
    });
    return offers;
  }
}

module.exports = OfferService;
