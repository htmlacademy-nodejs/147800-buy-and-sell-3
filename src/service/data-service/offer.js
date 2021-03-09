"use strict";

const Aliase = require(`../models/constants/aliase`);
const { Offer, Type } = require(`../models/index`);

class OfferService {
  async findAll(needComments) {
    // const include = [Aliase.CATEGORIES, Aliase.TYPES];
    // if (needComments) {
    //   include.push(Aliase.COMMENTS);
    // }
    const offers = await Offer.findAll({ include: [{ model: Type }] });
    return offers;
    // return offers.map((item) => item.get({ include }));
  }
}

module.exports = OfferService;
