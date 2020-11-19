"use strict";

const { Router } = require(`express`);
const { readContent } = require(`../cli/generate`);
const offersRoutes = require(`./routes/offers`);

const app = new Router();

app.use(`/offers`, offersRoutes);

app.get(`/categories`, async (req, res) => {
  const categories = await readContent(`./data/categories.txt`);
  res.json(categories);
});

app.get(`/search`, (req, res) => {
  res.send(`Search with query param "${req.query.query}"`);
});

module.exports = app;
