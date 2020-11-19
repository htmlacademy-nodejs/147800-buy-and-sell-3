"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const offersRouter = new Router();

const URL = `http://localhost:3000`;

offersRouter.get(`/add`, (req, res) => res.render(`offers/new-ticket`));
offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/edit/:id`, async (req, res) => {
  const { data: offer } = await axios.get(`${URL}/api/offers/${req.params.id}`);
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  res.render(`offers/ticket-edit`, { offer, categories });
});
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));

module.exports = offersRouter;
