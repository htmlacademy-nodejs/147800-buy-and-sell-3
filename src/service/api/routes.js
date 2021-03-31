"use strict";

const { Router } = require(`express`);
const offersRoutes = require(`./routes/offers`);
const { CategoryService } = require(`../data-service`);
const OfferService = require(`../data-service/offer`);

const app = new Router();
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

app.use(`/offers`, offersRoutes);

app.get(`/categories`, async (req, res) => {
  const { count } = req.query;
  const categories = await new CategoryService().findAll(count);
  res.status(HttpCode.OK).json(categories);
});

app.get(`/categories/:id`, async (req, res) => {
  const { id } = req.params;
  const category = await new CategoryService().findOne(id);
  res.status(HttpCode.OK).json(category);
});

app.get(`/cat`, async (req, res) => {
  const categories = await new OfferService().findAll();
  res.json(categories);
});

// app.get(`/search`, async (req, res) => {
//   try {
//     const { query } = req.query;
// const data = await SearchService.findAll(query);
// const fileContent = await fs.readFile(FILENAME);
// const offers = JSON.parse(fileContent);
// const filteredOffers = offers.filter((offer) =>
//   offer.title.toLowerCase().includes(query.toLowerCase().trim())
// );
//     res.json(`jee`);
//   } catch (error) {
//     res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
//   }
// });

module.exports = app;
