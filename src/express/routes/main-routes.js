"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const plural = require(`plural-ru`);
const mainRouter = new Router();

const URL = `http://localhost:3000`;

mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/search`, async (req, res) => {
  const { data: offers } = await axios.get(`${URL}/api/search`, {
    params: { query: req.query.search || `` }
  });
  const foundWord = plural(offers.length, `Найдена`, `Найдено`, `Найдено`);
  const publicationWords = plural(
    offers.length,
    `%d публикация`,
    `%d публикации`,
    `%d публикаций`
  );

  res.render(`main/search-result`, {
    offers,
    foundWord,
    publicationWords
  });
});
mainRouter.get(`/`, async (req, res) => {
  const { data: categories } = await axios.get(`${URL}/api/categories`);
  const { data: offers } = await axios.get(`${URL}/api/offers`);
  if (offers.length > 0) {
    res.render(`main/main`, { offers, categories });
  } else {
    res.render(`main/main--empty`);
  }
});

module.exports = mainRouter;
