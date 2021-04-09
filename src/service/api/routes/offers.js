"use strict";

const fs = require(`fs`).promises;
const { Router } = require(`express`);
const offersRouter = new Router();
const { OfferService } = require(`../../data-service`);

const FILENAME = `mocks.json`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

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

offersRouter.post(`/`, (req, res) => {
  res.send(`Add new offer`);
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

offersRouter.put(`/:offerId`, (req, res) => {
  res.send(`Update offer with offerId="${req.params.offerId}"`);
});

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

offersRouter.post(`/:offerId/comments`, (req, res) => {
  res.send(`Add new comment to offer with offerId="${req.params.offerId}"`);
});

offersRouter.delete(`/:offerId/comments/:commentId`, (req, res) => {
  res.send(
    `Delete comment with commentId="${req.params.commentId}" of offer with offerId="${req.params.offerId}"`
  );
});

module.exports = offersRouter;
