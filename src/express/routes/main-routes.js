"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const plural = require(`plural-ru`);
const upload = require(`../middlewares/upload`);
const mainRouter = new Router();

const URL = `http://localhost:3000`;

mainRouter.get(`/login`, (req, res) => {
  // TODO Module 7
  // const { error } = req.query;
  // const { user } = req.session;
  res.render(
    `login`
    // , { error, user }
  );
});
mainRouter.get(`/register`, (req, res) => {
  const { error } = req.query;
  console.log({ error });
  // TODO Module 7
  // const { user } = req.session;
  res.render(`sign-up`, { error });
});

mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const userData = {
    avatar: file.filename,
    name: body[`user-name`],
    email: body[`user-email`],
    password: body[`user-password`],
    passwordRepeated: body[`user-password-again`]
  };
  try {
    await axios.post(`${URL}/api/user`, userData);
    res.redirect(`/login`);
  } catch (error) {
    res.redirect(`/register?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRouter.get(`/search`, async (req, res) => {
  const { data: offers } = await axios.get(`${URL}/api/offers`);
  const { data: searchedOffers } = await axios.get(`${URL}/api/offers`, {
    params: { query: req.query.search || `` }
  });
  const foundWord = plural(
    searchedOffers.length,
    `Найдена`,
    `Найдено`,
    `Найдено`
  );
  const publicationWords = plural(
    searchedOffers.length,
    `%d публикация`,
    `%d публикации`,
    `%d публикаций`
  );

  res.render(`main/search-result`, {
    searchedOffers,
    foundWord,
    publicationWords,
    offers
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
