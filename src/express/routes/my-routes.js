"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const myRouter = new Router();

const URL = `http://localhost:3000`;

myRouter.get(`/comments`, async (req, res) => {
  const { data: offers } = await axios.get(`${URL}/api/offers?userId=1`);

  if (offers.length > 0) {
    res.render(`my/comments`, { offers });
  } else {
    res.render(`my/comments--empty`);
  }
});
myRouter.get(`/`, async (req, res) => {
  const { data } = await axios.get(`${URL}/api/offers`);
  res.render(`my/my-tickets`, { offers: data });
});

module.exports = myRouter;
