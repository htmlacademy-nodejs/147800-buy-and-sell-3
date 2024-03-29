"use strict";

const fs = require(`fs`).promises;
const { Router } = require(`express`);
const { HttpCode } = require(`../../../constants`);
const offerValidator = require(`../../middlewares/offer-validator`);
const offerExist = require(`../../middlewares/offer-exists`);
const commentValidator = require(`../../middlewares/comment-validator`);
const routeParamsValidator = require(`../../middlewares/route-params-validator`);
const { OfferService, CommentService } = require(`../../data-service`);
const offersRouter = new Router();

const FILENAME = `mocks.json`;

offersRouter.get(`/`, async (req, res) => {
  try {
    const { count, query, categoryId, userId, offset, limit } = req.query;
    if (offset || limit) {
      const offers = await new OfferService().findPage({
        categoryId,
        limit,
        offset
      });

      res.status(HttpCode.OK).json(offers);
    } else {
      const offers = await new OfferService().findAll({
        query,
        count,
        categoryId,
        userId
      });
      res.status(HttpCode.OK).json(offers);
    }
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.post(`/`, offerValidator, async (req, res) => {
  const offer = await new OfferService().create(req.body);

  return res.status(HttpCode.CREATED).json(offer);
});

offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const { offerId } = req.params;
    const [selectedOffer] = await new OfferService().findAll({
      offerId
    });
    if (!selectedOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
    }
    res.status(HttpCode.OK).json(selectedOffer);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.put(
  `/:offerId`,
  [routeParamsValidator, offerValidator],
  async (req, res) => {
    const { offerId } = req.params;

    const updated = await new OfferService().update(offerId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${offerId}`);
    }
    return res.status(HttpCode.OK).send(`Updated`);
  }
);

offersRouter.delete(`/:offerId`, (req, res) => {
  res.send(`Delete offer with offerId="${req.params.offerId}"`);
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const offers = JSON.parse(fileContent);
    const selectedOffer = offers.find(
      (offer) => offer.id === req.params.offerId
    );
    if (!selectedOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Offer not found`);
    }
    res.json(selectedOffer.comments);
  } catch (error) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
  }
});

offersRouter.post(
  `/:offerId/comments`,
  [routeParamsValidator, offerExist(OfferService), commentValidator],
  async (req, res) => {
    const { offerId } = req.params;

    const comment = await new CommentService().create(offerId, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  }
);

offersRouter.delete(`/:offerId/comments/:commentId`, (req, res) => {
  res.send(
    `Delete comment with commentId="${req.params.commentId}" of offer with offerId="${req.params.offerId}"`
  );
});

module.exports = offersRouter;
