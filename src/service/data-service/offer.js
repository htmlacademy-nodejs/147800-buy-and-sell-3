"use strict";

const { Op } = require(`sequelize`);
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

  async findPage({ categoryId, limit, offset }) {
    const { count, rows } = await Offer.findAndCountAll({
      limit,
      offset,
      include: [
        Aliase.TYPE,
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
