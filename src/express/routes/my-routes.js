"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const myRouter = new Router();

const URL = `http://localhost:3000`;

myRouter.get(`/comments`, (req, res) => res.render(`my/comments`));
myRouter.get(`/`, async (req, res) => {
  const { data } = await axios.get(`${URL}/api/offers`);
  res.render(`my/my-tickets`, { offers: data });
});

module.exports = myRouter;
