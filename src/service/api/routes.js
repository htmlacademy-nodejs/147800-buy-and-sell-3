"use strict";

const { Router } = require(`express`);
const offersRoutes = require(`./routes/offers`);

const app = new Router();

app.use(`/offers`, offersRoutes);

app.get(`/categories`, (req, res) => {
  res.send(`Send categories`);
});

app.get(`/search`, (req, res) => {
  res.send(`Search with query param "${req.query.query}"`);
});

module.exports = app;
