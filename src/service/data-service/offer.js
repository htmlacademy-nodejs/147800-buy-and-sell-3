"use strict";

const { Op } = require(`sequelize`);
const Aliase = require(`../models/constants/aliase`);
const {
  Category,
  Comment,
  Offer,
  User,
  OfferCategory
} = require(`../models/index`);

class OfferService {
  async create(offerData) {
    const offer = await Offer.create(offerData);
    return offer.get();
  }

  async findAll({ query, offerId, userId, categoryId }) {
    let whereStatement = {};
    if (offerId) {
      whereStatement = { ...whereStatement, id: offerId };
    }
    if (query) {
      whereStatement = {
        ...whereStatement,
        title: {
          [Op.substring]: query
        }
      };
    }
    const offers = await Offer.findAll({
      where: whereStatement,
      include: [
        {
          model: Comment,
          as: Aliase.COMMENTS
        },
        { model: User, as: Aliase.USERS, where: userId ? { id: userId } : {} },
        {
          model: Category,
          as: Aliase.CATEGORIES,
          where: categoryId ? { id: categoryId } : {}
        }
      ],
      attributes: { exclude: [`userId`] }
    });
    return offers;
  }

  async findPage({ categoryId, limit, offset }) {
    const { count, rows } = await Offer.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Category,
          as: Aliase.CATEGORIES,
          where: categoryId ? { id: categoryId } : {}
        }
      ],
      distinct: true,
      attributes: { exclude: [`type_id`] }
    });
    return { count, offers: rows };
  }
}

module.exports = OfferService;
