"use strict";

const { Op } = require(`sequelize`);
const Aliase = require(`../models/constants/aliase`);
const { Category, Comment, Offer, User } = require(`../models/index`);

class OfferService {
  async create(offerData) {
    const offer = await Offer.create(offerData);
    return offer.get();
  }

  async update(id, offer) {
    const [affectedRows] = await Offer.update(offer, {
      where: { id }
    });
    return !!affectedRows;
  }

  async findAll(needComments) {
    const include = [
      Aliase.CATEGORIES,
      {
        model: User,
        as: Aliase.USER,
        attributes: {
          exclude: [`password`]
        }
      }
    ];
    if (needComments) {
      include.push({
        model: Comment,
        as: Aliase.COMMENTS,
        include: [
          {
            model: User,
            as: Aliase.USER,
            attributes: {
              exclude: [`password`]
            }
          }
        ]
      });
    }
    const offers = await Offer.findAll({ include });
    return offers.map((item) => item.get());
  }

  findOne(id, needComments) {
    const include = [
      Aliase.CATEGORIES,
      {
        model: User,
        as: Aliase.USER,
        attributes: {
          exclude: [`password`]
        }
      }
    ];
    if (needComments) {
      include.push({
        model: Comment,
        as: Aliase.COMMENTS,
        include: [
          {
            model: User,
            as: Aliase.USER,
            attributes: {
              exclude: [`password`]
            }
          }
        ]
      });
    }
    return Offer.findByPk(id, { include });
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
