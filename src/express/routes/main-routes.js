"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const mainRouter = new Router();

const URL = `http://localhost:3000`;

mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/search`, (req, res) => res.render(`main/search-result`));
mainRouter.get(`/`, async (req, res) => {
  const { data } = await axios.get(`${URL}/api/offers`);
  res.render(`main/main`, { offers: data });
});

module.exports = mainRouter;
