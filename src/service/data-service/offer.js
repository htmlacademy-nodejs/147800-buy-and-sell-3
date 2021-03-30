"use strict";

const Aliase = require(`../models/constants/aliase`);
const { Category, Comment, Offer, Type, User } = require(`../models/index`);

class OfferService {
  async findAll({ categoryId }) {
    // const include = [Aliase.CATEGORIES, Aliase.TYPE];
    // if (needComments) {
    //   include.push(Aliase.COMMENTS);
    // }
    const offers = await Offer.findAll({
      include: [
        Aliase.COMMENTS,
        Aliase.TYPE,
        Aliase.USER,
        {
          model: Category,
          as: Aliase.CATEGORIES,
          where: {
            id: categoryId
          }
        }
      ],
      attributes: { exclude: [`typeId`, `userId`] }
    });
    return offers;
    // return offers.map((item) => item.get({ include }));
  }
}

module.exports = OfferService;
