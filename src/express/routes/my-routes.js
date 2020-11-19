"use strict";

const { Router } = require(`express`);
const axios = require(`axios`);
const myRouter = new Router();

const URL = `http://localhost:3000`;

myRouter.get(`/comments`, async (req, res) => {
  const { data: offers } = await axios.get(`${URL}/api/offers`);
  const { data: firstOfferComments } = await axios.get(
    `${URL}/api/offers/${offers[0].id}/comments`
  );
  const { data: secondOfferComments } = await axios.get(
    `${URL}/api/offers/${offers[1].id}/comments`
  );
  const { data: thirdOfferComments } = await axios.get(
    `${URL}/api/offers/${offers[2].id}/comments`
  );
  const comments = [
    ...firstOfferComments,
    ...secondOfferComments,
    ...thirdOfferComments,
  ];
  res.render(`my/comments`, { comments });
});
myRouter.get(`/`, async (req, res) => {
  const { data } = await axios.get(`${URL}/api/offers`);
  res.render(`my/my-tickets`, { offers: data });
});

module.exports = myRouter;
