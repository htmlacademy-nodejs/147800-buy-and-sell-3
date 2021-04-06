"use strict";

const Sequelize = require(`sequelize`);
const Aliase = require(`../models/constants/aliase`);
const { Category, OfferCategory } = require(`../models/index`);

class CategoryService {
  findOne(id) {
    return Category.findOne({
      where: {
        id
      },
      attributes: [
        `id`,
        `label`,
        `picture`,
        `retinaPicture`,
        [Sequelize.fn(`COUNT`, Sequelize.col(`category_id`)), `count`]
      ],
      group: [Sequelize.col(`id`)],
      include: [
        {
          model: OfferCategory,
          attributes: []
        }
      ]
    });
  }

  findAll(needCount) {
    return Category.findAll({
      attributes: [
        `id`,
        `label`,
        `picture`,
        `retinaPicture`,
        [Sequelize.fn(`COUNT`, Sequelize.col(`category_id`)), `count`]
      ],
      group: [Sequelize.col(`id`)],
      order: [[`id`, `ASC`]],
      include: [
        {
          model: OfferCategory,
          attributes: []
        }
      ]
    });
    // if (needCount) {
    //   const result = await Category.findAll({
    //     attributes: [`id`, `label`, [Sequelize.fn(`COUNT`, `*`), `count`]],
    //     group: [Sequelize.col(`Category.id`)],
    //     include: [
    //       {
    //         model: OfferCategory,
    //         as: Aliase.OFFER_CATEGORIES,
    //         attributes: []
    //       }
    //     ]
    //   });
    //   return result.map((it) => it.get());
    // } else {
    //   return Category.findAll({ raw: true });
    // }
  }
}

module.exports = CategoryService;
