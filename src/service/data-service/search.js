"use strict";

const { Op } = require(`sequelize`);
const Aliase = require(`../models/constants/aliase`);
const { Offer, User } = require(`../models/index`);

class SearchService {
  async findAll(searchText) {
    const offers = await Offer.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [
        Aliase.CATEGORIES,
        {
          model: User,
          as: Aliase.USER,
          attributes: {
            exclude: [`password`]
          }
        }
      ]
    });
    return offers.map((offer) => offer.get());
  }
}

module.exports = SearchService;
